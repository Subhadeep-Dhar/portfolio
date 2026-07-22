import { useEffect, useRef, useState } from 'react';
import { HandLandmarker, FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export function useGestures(enabled, onAction) {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const handLandmarkerRef = useRef(null);
  const requestRef = useRef(null);
  const lastVideoTime = useRef(-1);
  const [isReady, setIsReady] = useState(false);

  const gestureCooldown = useRef(false);
  const consecutiveCounts = useRef({
    SCROLL_UP: 0,
    SCROLL_DOWN: 0,
    PREV_SECTION: 0,
    NEXT_SECTION: 0,
    SHOW_RESUME: 0,
  });

  const actionRef = useRef(onAction);
  useEffect(() => {
    actionRef.current = onAction;
  }, [onAction]);

  useEffect(() => {
    if (!enabled) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }
      setIsReady(false);
      return;
    }

    const init = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.12/wasm"
        );
        
        // Initialize FaceLandmarker
        faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numFaces: 1,
        });

        // Initialize HandLandmarker
        handLandmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });

        // Setup camera
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        video.playsInline = true;
        video.play();
        videoRef.current = video;

        video.addEventListener('loadeddata', () => {
          setIsReady(true);
          predictWebcam();
        });
      } catch (err) {
        console.error("Error initializing gestures:", err);
        setIsReady(false);
      }
    };

    init();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }
    };
  }, [enabled]);

  const triggerAction = (action) => {
    if (gestureCooldown.current) return;
    actionRef.current(action);
    gestureCooldown.current = true;
    
    // Reset all consecutive counts
    Object.keys(consecutiveCounts.current).forEach(key => {
      consecutiveCounts.current[key] = 0;
    });

    // 1.5s cooldown to prevent accidental rapid triggers
    setTimeout(() => { gestureCooldown.current = false; }, 1500); 
  };

  const predictWebcam = () => {
    if (!videoRef.current || !faceLandmarkerRef.current || !handLandmarkerRef.current) return;

    if (lastVideoTime.current !== videoRef.current.currentTime) {
      lastVideoTime.current = videoRef.current.currentTime;
      const nowInMs = performance.now();
      
      let detectedAction = null;

      // 1. Check Hand for Resume (Priority)
      const handResults = handLandmarkerRef.current.detectForVideo(videoRef.current, nowInMs);
      if (handResults.landmarks && handResults.landmarks.length > 0) {
        const hand = handResults.landmarks[0];
        // Check if all 5 fingers are extended
        // Fingertips: Thumb(4), Index(8), Middle(12), Ring(16), Pinky(20)
        // Lower joints: Thumb(2), Index(6), Middle(10), Ring(14), Pinky(18)
        // y is 0 at top, 1 at bottom. So tip.y < joint.y means finger is pointing up/extended
        const isPalmOpen = 
          hand[4].y < hand[2].y &&
          hand[8].y < hand[6].y &&
          hand[12].y < hand[10].y &&
          hand[16].y < hand[14].y &&
          hand[20].y < hand[18].y;

        if (isPalmOpen) {
          detectedAction = 'SHOW_RESUME';
        }
      }

      // 2. Check Face for Navigation/Scrolling
      if (!detectedAction) {
        const faceResults = faceLandmarkerRef.current.detectForVideo(videoRef.current, nowInMs);
        if (faceResults.faceLandmarks && faceResults.faceLandmarks.length > 0) {
          const face = faceResults.faceLandmarks[0];
          
          // Face landmarks:
          // Nose tip: index 1
          // Left eye center: index 159 (approx top of left eye)
          // Right eye center: index 386 (approx top of right eye)
          // Face top (forehead): index 10
          // Face bottom (chin): index 152

          const nose = face[1];
          const leftEye = face[159]; // Note: MediaPipe returns mirrored coords sometimes, but generally 159 is right side of image, 386 is left side of image (user's right/left)
          const rightEye = face[386]; 
          const top = face[10];
          const bottom = face[152];

          // Face tilt (Roll)
          // If the y-difference between eyes is large relative to face height
          const faceHeight = bottom.y - top.y;
          const tiltDiff = rightEye.y - leftEye.y;
          const tiltRatio = tiltDiff / faceHeight;

          // Head up/down (Pitch)
          // Compare distance from nose to top vs nose to bottom
          const distToTop = nose.y - top.y;
          const distToBottom = bottom.y - nose.y;
          const pitchRatio = distToTop / distToBottom;

          // Thresholds calibrated for robust detection
          if (tiltRatio > 0.15) {
            detectedAction = 'PREV_SECTION'; // Tilted left
          } else if (tiltRatio < -0.15) {
            detectedAction = 'NEXT_SECTION'; // Tilted right
          } else if (pitchRatio < 0.65) {
            detectedAction = 'SCROLL_UP'; // Head tilted significantly up (nose closer to top)
          } else if (pitchRatio > 1.4) {
            detectedAction = 'SCROLL_DOWN'; // Head tilted significantly down (nose closer to bottom)
          }
        }
      }

      // 3. Process Consecutive Frames for Robustness
      if (!gestureCooldown.current) {
        // Increment detected action
        if (detectedAction) {
          consecutiveCounts.current[detectedAction]++;
        }

        // Decay others to prevent accumulated false positives
        Object.keys(consecutiveCounts.current).forEach(key => {
          if (key !== detectedAction && consecutiveCounts.current[key] > 0) {
            consecutiveCounts.current[key]--;
          }
        });

        // Trigger if threshold met (e.g. 10 consecutive frames is about 0.3 seconds at 30fps)
        if (detectedAction && consecutiveCounts.current[detectedAction] >= 8) {
          triggerAction(detectedAction);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    requestRef.current = requestAnimationFrame(predictWebcam);
  };

  return { isReady };
}
