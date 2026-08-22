import { ParallaxComponent } from '@/components/ui/parallax-scrolling';

export default function ParallaxDemo() {
  return (
    <div className="w-full relative z-20">
      <ParallaxComponent />
      {/* <div className="osmo-credits text-center p-4 text-sm text-gray-500">
        <p className="osmo-credits__p">Resource by <a target="_blank" href="https://www.osmo.supply/" className="osmo-credits__p-a hover:text-white transition-colors">Osmo</a>
        </p>
      </div> */}
    </div>
  );
}
