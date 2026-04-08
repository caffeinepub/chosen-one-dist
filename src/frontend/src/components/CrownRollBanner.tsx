import { useEffect } from "react";
import { useAppStore } from "../store";

const BANNER_DURATION_MS = 4500;

export function CrownRollBanner() {
  const { crownBannerVisible, crownBannerMessage, hideCrownBanner } =
    useAppStore();

  useEffect(() => {
    if (!crownBannerVisible) return;
    const timer = setTimeout(hideCrownBanner, BANNER_DURATION_MS);
    return () => clearTimeout(timer);
  }, [crownBannerVisible, hideCrownBanner]);

  if (!crownBannerVisible) return null;

  return (
    <div
      className="fixed top-14 sm:top-16 left-0 right-0 z-50 pointer-events-none overflow-hidden"
      aria-live="polite"
      data-ocid="crown-roll-banner"
    >
      {/* Gold gradient bar — responsive height */}
      <div className="relative h-10 sm:h-12 md:h-14 bg-gradient-to-r from-background via-primary/10 to-background border-y border-primary/30 flex items-center">
        {/* Rolling crown + message */}
        <div className="animate-crown-roll flex items-center gap-2 sm:gap-3 whitespace-nowrap px-4">
          <span
            className="text-2xl sm:text-3xl drop-shadow-lg"
            style={{
              filter: "drop-shadow(0 0 8px oklch(0.76 0.165 65 / 0.8))",
            }}
          >
            👑
          </span>
          <span className="font-display font-bold text-primary text-sm sm:text-base md:text-lg tracking-wide">
            {crownBannerMessage}
          </span>
          <span
            className="text-2xl sm:text-3xl drop-shadow-lg"
            style={{
              filter: "drop-shadow(0 0 8px oklch(0.76 0.165 65 / 0.8))",
            }}
          >
            👑
          </span>
        </div>
        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, oklch(0.76 0.165 65 / 0.04) 50%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}
