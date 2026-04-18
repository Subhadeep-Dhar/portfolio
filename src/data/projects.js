/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  PROJECT DATA FILE                                           ║
 * ║  Edit ONLY this file to add, remove, or update projects.    ║
 * ║  UI components render from this automatically.              ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Fields per project:
 *   id             — unique slug (used in URLs, keys)
 *   title          — experiment name
 *   tagline        — one-line hook
 *   problem        — what problem were you solving?
 *   hypothesis     — your initial hypothesis / approach idea
 *   approach       — how you actually built it
 *   result         — what happened, metrics, outcome
 *   future         — what you'd improve next
 *   tech           — array of tech strings (shown as badges)
 *   tags           — filter categories
 *   featured       — boolean: show in Case Studies section?
 *   status         — 'completed' | 'in-progress' | 'archived'
 *   year           — string
 *   links          — { demo, github } (null if not available)
 */

export const projects = [
  // {
  //   id: 'sentiment-engine',
  //   title: 'Sentiment Analysis Engine',
  //   tagline: 'Real-time NLP pipeline for customer feedback classification',
  //   problem:
  //     'A retail client received 10,000+ monthly reviews across platforms. Manual tagging took 3 days per month and missed nuanced emotion categories.',
  //   hypothesis:
  //     'A fine-tuned transformer model with a streaming ingestion layer could classify sentiment and extract themes in under 200ms per document.',
  //   approach:
  //     'Built a Python FastAPI service wrapping a fine-tuned DistilBERT model. Kafka handles streaming ingestion; results are stored in PostgreSQL with a React dashboard for live visualization.',
  //   result:
  //     'Reduced tagging time from 3 days to under 4 hours. Accuracy: 91.3% on 5-class classification. Dashboard adopted by 3 internal teams.',
  //   future:
  //     'Add aspect-based sentiment (ABSA) to drill into specific product features. Explore few-shot classification for niche verticals.',
  //   tech: ['Python', 'FastAPI', 'HuggingFace', 'Kafka', 'PostgreSQL', 'React', 'Docker'],
  //   tags: ['ML', 'Backend', 'Data'],
  //   featured: true,
  //   status: 'completed',
  //   year: '2024',
  //   links: {
  //     demo: null,
  //     github: 'https://github.com/yourusername/sentiment-engine',
  //   },
  // },
  {
    id: 'face-gesture-controller',
    title: 'Face Gesture Controller',
    tagline: 'Hands-free reels control using real-time gesture and facial expression detection',
    problem:
      'Controlling Instagram Reels requires constant hand interaction. Wanted a completely hands-free way to like, skip, and navigate short-form content using only facial expressions.',
    hypothesis:
      'MediaPipe FaceMesh landmarks could reliably detect smile, eyebrow raises, and mouth open gestures with enough stability filtering to avoid false positives — and map them directly to browser keyboard shortcuts.',
    approach:
      'Built a Python script using MediaPipe FaceLandmarker for 468-point face mesh detection and OpenCV for real-time webcam capture. Gesture stability is enforced by requiring 8+ consecutive frames before firing. PyAutoGUI sends keyboard shortcuts directly to the focused Chrome window — no mouse movement involved primarily focused on Instagram Reels (Arrow keys, L).',
    result:
      'Achieved stable real-time gesture detection at 15+ FPS. Three gestures reliably detected — left head tilt for next video, right head tilt for previous video, mouth open for like. Zero mouse interaction needed once Chrome is focused.',
    future:
      'Add wink detection for play/pause. Explore eye-tracking for cursor control. Package as a background system tray app so no terminal window is needed.',
    tech: ['Python', 'MediaPipe', 'OpenCV', 'PyAutoGUI', 'NumPy'],
    tags: ['Computer Vision', 'ML'],
    featured: true,
    status: 'completed',
    year: '2026',
    links: {
      demo: null,
      github: 'https://github.com/Subhadeep-Dhar/face-gesture-media-controller',
    },
  },
  // {
  //   id: 'query-optimizer',
  //   title: 'SQL Query Optimizer',
  //   tagline: 'Static analysis tool that rewrites slow queries automatically',
  //   problem:
  //     'A reporting database ran 600+ daily queries. 30% took over 10s each, blocking the BI team during peak hours.',
  //   hypothesis:
  //     'Most slowdowns follow recognizable anti-patterns (missing indexes, N+1 fetches, SELECT *). A rule-based AST analyzer could catch and suggest fixes automatically.',
  //   approach:
  //     'Built a Python tool using sqlglot to parse SQL into ASTs. A rule engine checks 14 anti-pattern categories and emits annotated suggestions. Integrated as a pre-commit hook and a VSCode extension.',
  //   result:
  //     'Caught 78% of slow queries in CI before they hit production. Average query time on flagged queries dropped by 64% after applying suggestions.',
  //   future:
  //     'Add LLM-powered explain-plan analysis for queries that pass static rules but still run slow.',
  //   tech: ['Python', 'sqlglot', 'AST', 'VSCode Extension API', 'TypeScript'],
  //   tags: ['Tools', 'Backend', 'Data'],
  //   featured: true,
  //   status: 'completed',
  //   year: '2024',
  //   links: {
  //     demo: null,
  //     github: 'https://github.com/yourusername/sql-optimizer',
  //   },
  // },
  {
    id: 'famspace',
    title: 'FamSpace – Offline-First Family Digital Vault',
    tagline: 'Secure, hierarchical file manager for organizing family data',
    problem:
      'Families often store important documents and media across devices without a structured system, making organization and controlled sharing difficult. Existing solutions rely heavily on cloud storage, raising privacy concerns and requiring constant internet access.',
    hypothesis:
      'An offline-first, device-controlled system with structured storage can provide a secure and private way to organize and manage family data, while still being extensible to controlled sharing mechanisms.',
    approach:
      'Built an Android application using Kotlin and Jetpack Compose with a Room database for metadata and internal storage for file management. Implemented a hierarchical structure (Space → Member → Folder → File) with strict synchronization between database and filesystem. Designed role-based access (Owner vs Read-only simulation) and reactive state management using StateFlow for navigation, sorting, and search.',
    result:
      'Developed a functional offline-first digital vault where users can organize, manage, preview, and share files locally with a clean UI and consistent data handling between storage and database.',
    future:
      'Implement QR-based time-bound access with passkey authentication for secure sharing across devices. Add cloud synchronization for backup and multi-device access, along with end-to-end encryption and intelligent file organization features.',
    tech: [
      'Kotlin',
      'Jetpack Compose',
      'Room Database',
      'Kotlin Coroutines',
      'StateFlow',
      'Kotlinx Serialization',
      'ZXing (planned for QR)',
      'Android DataStore'
    ],
    tags: ['Android'],
    featured: true,
    status: 'completed',
    year: '2026',
    links: {
      demo: null,
      github: 'https://github.com/Subhadeep-Dhar/FamSpace-offline',
    },
  },
  {
    id: 'muse-mart',
    title: 'Muse Mart — E-Commerce Platform',
    tagline: 'Full-stack musical instruments marketplace with real-time trending insights',

    problem:
      'Traditional e-commerce platforms lack real-time insights such as trending products and user interaction analytics, leading to less personalized and static browsing experiences.',

    hypothesis:
      'Integrating caching and real-time tracking using Redis can enable dynamic features like trending products and recently viewed items, improving user engagement and system performance.',

    approach:
      'Built a full-stack application using React (Vite) for frontend and Node.js with Express for backend. Used MongoDB Atlas for data storage and Upstash Redis for caching product views, trending data, and recently viewed items. Implemented REST APIs with filtering, pagination, and search functionality. Deployed backend on Render and frontend on Vercel.',

    result:
      'Successfully developed and deployed a scalable cloud-based e-commerce system with real-time trending features, efficient API performance, and a responsive user interface.',

    future:
      'Add authentication and user accounts, implement payment gateway integration, introduce recommendation systems, and enhance analytics with personalized suggestions.',

    tech: [
      'React',
      'Vite',
      'Node.js',
      'Express.js',
      'MongoDB Atlas',
      'Mongoose',
      'Redis',
      'Upstash',
      'REST API',
      'Render',
      'Vercel'
    ],

    tags: ['Fullstack', 'Next.js / React'],

    featured: true,
    status: 'completed',
    year: '2026',

    links: {
      demo: 'https://e-commerce-product-nosql.vercel.app/',
      github: 'https://github.com/Subhadeep-Dhar/E-commerce-product-nosql',
    },
  },
  {
    id: 'budget-tracker',
    title: 'Expense Insight Engine',
    tagline: 'Personal finance tracker with ML-powered anomaly detection',
    problem:
      'Generic budgeting apps show totals but miss the "why did I overspend this month" insight. Manual categorization is tedious.',
    hypothesis:
      'Auto-categorization + anomaly detection on transaction patterns can surface actionable insights without requiring manual input.',
    approach:
      'Next.js app + Plaid API for bank data ingestion. K-means clustering for category detection; isolation forest for anomaly scoring. Charts via Recharts.',
    result:
      'Personal use: identified 3 recurring forgotten subscriptions totalling ₹2,400/month within the first week.',
    future:
      'Predict upcoming large expenses based on seasonal patterns. Add goal-based savings nudges.',
    tech: ['Next.js', 'Plaid API', 'Python', 'Scikit-learn', 'Recharts', 'Prisma'],
    tags: ['ML', 'Fullstack', 'Data'],
    featured: false,
    status: 'in-progress',
    year: '2024',
    links: {
      demo: null,
      github: null,
    },
  },
  {
    id: 'portfolio_site',
    title: 'Portfolio Website',
    tagline: 'Showcasing my work and skills in a modern, responsive design',
    problem:
      'Developers often need a lightweight, high-performance way to present projects and skills without heavy frameworks or backend setup.',
    hypothesis:
      'A fully static, minimal-dependency site using Next.js, Tailwind CSS, and Framer Motion can deliver an interactive, visually appealing portfolio that loads fast and is easy to maintain.',
    approach:
      'Next.js 14 (App Router) for routing and SSR, React 18 for component state, Tailwind CSS 3 for styling with custom design tokens, and Framer Motion 11 for minimal scroll and layout animations. Pure CSS handles grid background and visual effects.',
    result:
      'A fully static portfolio site with minimal dependencies, optimized for Lighthouse scores and fast loading, deployed on Vercel.',
    future:
      'Add new projects dynamically, improve accessibility, and explore light theme/dark theme toggles for enhanced UX.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    tags: ['Frontend', 'Next.js / React'],
    featured: true,
    status: 'completed',
    year: '2026',
    links: {
      demo: 'https://portfolio-subhadeep-dhar.vercel.app/',
      github: 'https://github.com/Subhadeep-Dhar/portfolio',
    },
  },
  {
    id: 'deepfake_detection',
    title: 'Deepfake Image Detection',
    tagline: 'Detecting AI-generated faces using machine learning for trustworthy digital media',
    problem:
      'With the rapid rise of AI-generated images, distinguishing real images from deepfakes has become increasingly difficult, leading to risks in misinformation, identity fraud, and digital trust.',
    hypothesis:
      'A machine learning-based approach leveraging convolutional neural networks (CNNs) trained on real vs. synthetic image datasets can accurately detect subtle artifacts and inconsistencies in deepfake images.',
    approach:
      'Built and trained a deep learning model using CNN architectures on labeled datasets of real and fake images. Applied image preprocessing techniques such as normalization, resizing, and augmentation to improve generalization. Used TensorFlow/PyTorch for model training, and integrated the trained model into a lightweight web interface for real-time predictions.',
    result:
      'Achieved high classification accuracy on validation data, with fast inference suitable for real-time detection. The system can reliably flag manipulated or AI-generated images, enhancing digital content verification.',
    future:
      'Expand the dataset to include newer deepfake techniques, improve model robustness against adversarial attacks, and deploy as an API or browser extension for wider accessibility.',
    tech: ['Python', 'TensorFlow', 'PyTorch'],
    tags: ['ML', 'AI', 'Research'],
    featured: true,
    status: 'completed',
    year: '2025',
    links: {
      demo: '',
      github: '',
    },
  },
  {
    id: 'manipal_ndvi_lst',
    title: 'NDVI–LST Multi-Temporal Analysis (Manipal)',
    tagline: 'Assessing vegetation–temperature dynamics in a monsoon-driven coastal environment',

    problem:
      'Understanding the interaction between vegetation greenness and land surface temperature (LST) in monsoon-dominated regions is challenging due to strong seasonal variability and persistent cloud cover, which limits consistent satellite observations.',

    hypothesis:
      'Multi-temporal satellite observations can capture seasonal variability in vegetation and temperature, and reveal measurable relationships between NDVI, LST, and precipitation in a coastal monsoon environment.',

    approach:
      'Landsat 8 Collection 2 Level-2 data were processed in Google Earth Engine to generate monthly median composites of NDVI and LST from 2020 to 2025. Cloud masking and quality filtering were applied, followed by temporal aggregation. CHIRPS precipitation data were aggregated to monthly totals. Statistical analysis included correlation and trend analysis, while QGIS was used for spatial visualization and seasonal composite mapping.',

    result:
      'The study revealed strong seasonal variability, with higher NDVI during monsoon periods and elevated LST during pre-monsoon months. A weak inverse relationship between NDVI and LST (r ≈ −0.26) was observed, indicating that vegetation contributes to temperature moderation but is not the dominant controlling factor. Precipitation showed a stronger influence on vegetation dynamics.',

    future:
      'Future work can incorporate higher-resolution datasets, lag-based climatic analysis, and spatial modeling to better understand vegetation–temperature coupling and improve environmental monitoring in monsoon-affected regions.',

    tech: [
      'Remote Sensing',
      'Google Earth Engine',
      'Landsat 8',
      'CHIRPS',
      'QGIS',
      'Time-Series Analysis'
    ],

    tags: [
      'Remote Sensing / GIS',
      'Research'
    ],

    featured: true,
    status: 'in-progress',
    year: '2026',

    links: {
      demo: null,
      github: null,
    },
  },
  {
    id: 'south_lhonak_glacier',
    title: 'South Lhonak Glacier Health Assessment',
    tagline: 'Analyzing glacier velocity and health post-Teesta flood hazard in Sikkim',
    problem:
      'Rapid glacier changes and flood hazards make monitoring glacier health and predicting risks challenging.',
    hypothesis:
      'Remote sensing data combined with anomaly detection can identify accelerated glacier movement and areas of potential hazard without extensive field surveys.',
    approach:
      'Satellite imagery + digital elevation models (DEMs) for velocity mapping. K-means clustering for glacier zone classification; isolation forest for detecting abnormal velocity patterns.',
    result:
      'Initial analysis identified accelerated flow zones in the lower South Lhonak Glacier correlating with post-flood debris deposition, highlighting potential hazard zones.',
    future:
      'Integrate climate data to model seasonal glacier dynamics and predict flood risks. Develop early-warning alerts for downstream communities.',
    tech: ['Satellite Imagery', 'Geospatial Analysis', 'GIS', 'QGIS', 'SNAP'],
    tags: ['ML', 'Research', 'Remote Sensing / GIS'],
    featured: false,
    status: 'completed',
    year: '2024',
    links: {
      demo: null,
      github: null,
    },
  },
];

// ─── Helper: get only featured projects for Case Studies ──────────
export const featuredProjects = projects.filter((p) => p.featured);

// ─── Helper: get unique filter tags ───────────────────────────────
export const allTags = [...new Set(projects.flatMap((p) => p.tags))].sort();
