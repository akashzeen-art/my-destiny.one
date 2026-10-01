import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { whenPreloaderReady } from "@/lib/scrollAnimations";
import { BRAND } from "@/lib/brand";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { isGatedServicePath } from "@/lib/serviceAccess";

/** Exact Cosmic Astro home category grid (3×3). */
const CATEGORIES = [
  { label: "Horoscope", path: "/horoscope" },
  { label: "Talk to Astra", path: "/talk-to-astra" },
  { label: "About Astrology", path: "/about" },
  { label: "Tarot", path: "/tarot" },
  { label: "Numerology", path: "/numerology" },
  { label: "Dream interpretation", path: "/dreams" },
  { label: "Chinese horoscope", path: "/chinese-horoscope" },
  { label: "About Astrology Houses", path: "/astrology-houses" },
  { label: "Planets", path: "/planets" },
] as const;

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { requestService } = useSubscription();

  useEffect(() => {
    let ctx: gsap.Context | undefined;

    const run = () => {
      if (!contentRef.current) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          contentRef.current!.children,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.05 }
        );
      }, heroRef);
    };

    const remove = whenPreloaderReady(run);
    return () => {
      remove();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex flex-1 flex-col overflow-hidden bg-transparent pb-10 pt-1 md:pb-14"
    >
      <div ref={contentRef} className="container relative z-[1] mx-auto w-full max-w-5xl px-3 sm:px-4">
        <div className="mx-auto mb-3 mt-6 flex max-w-[200px] justify-center sm:mb-4 sm:mt-8 sm:max-w-[230px] md:mt-10 md:max-w-[260px]">
          <img
            src="/head.png"
            alt={`${BRAND.NAME} — Astra`}
            className="cosmic-head w-full select-none"
            draggable={false}
          />
        </div>

        <div className="cosmic-intro mx-auto mb-5 max-w-3xl sm:mb-7">
          Hello Wanderer, I&apos;m Astra, how can I enlighten you today?
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 md:gap-3">
          {CATEGORIES.map((item) => (
            <button
              key={item.label}
              type="button"
              className="cosmic-category-btn"
              onClick={() => {
                if (isGatedServicePath(item.path)) {
                  requestService(item.path);
                } else {
                  navigate(item.path);
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
