import { useCallback, useEffect, useRef, useState } from "react";
import { BRAND } from "@/lib/brand";
import { notifyPreloaderComplete } from "@/lib/scrollAnimations";
import { cn } from "@/lib/utils";

const TOTAL_MS = 4_200;
const BLUR_LEAD_MS = 1_300;
const FADE_MS = 1_100;
const MAX_BLUR_PX = 22;

const ZODIAC = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"] as const;

const MESSAGES = [
  "Awakening the night sky…",
  "Charting the celestial spheres…",
  "Whispering with the planets…",
  "Opening the cosmic gate…",
] as const;

const FLOAT_PLANETS = [
  { src: "/planets/saturn.png", className: "preloader-float preloader-float-saturn" },
  { src: "/planets/neptune.png", className: "preloader-float preloader-float-neptune" },
  { src: "/planets/moon.png", className: "preloader-float preloader-float-moon" },
] as const;

type Phase = "active" | "fade-out" | "hidden";

type PStar = { x: number; y: number; r: number; phase: number; speed: number; gold: boolean };

const PreloaderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shootingRef = useRef({ on: false, x: 0, y: 0, vx: 0, vy: 0, life: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let stars: PStar[] = [];

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: w < 768 ? 140 : 260 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.3 + Math.random() * 2.6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.8,
        gold: Math.random() > 0.76,
      }));
    };

    const draw = (t: number) => {
      const time = t * 0.001;

      const bg = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.9);
      bg.addColorStop(0, "#323c40");
      bg.addColorStop(0.3, "#1F2628");
      bg.addColorStop(0.7, "#14191b");
      bg.addColorStop(1, "#090c0e");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      for (const [cx, cy, r, a] of [
        [0.2, 0.25, 0.32, 0.12],
        [0.82, 0.32, 0.34, 0.09],
        [0.48, 0.78, 0.38, 0.08],
        [0.7, 0.15, 0.22, 0.06],
      ] as const) {
        const g = ctx.createRadialGradient(w * cx, h * cy, 0, w * cx, h * cy, Math.max(w, h) * r);
        g.addColorStop(0, `rgba(171,141,96,${a + 0.035 * Math.sin(time * 0.9 + cx * 4)})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      ctx.save();
      ctx.translate(w * 0.5, h * 0.38);
      ctx.rotate(-0.38);
      const band = ctx.createLinearGradient(-w, 0, w, 0);
      band.addColorStop(0, "transparent");
      band.addColorStop(0.42, `rgba(190,205,220,${0.04 + 0.02 * Math.sin(time * 0.55)})`);
      band.addColorStop(0.5, `rgba(171,141,96,${0.12 + 0.04 * Math.sin(time * 0.7)})`);
      band.addColorStop(0.58, `rgba(190,205,220,${0.04 + 0.02 * Math.sin(time * 0.55)})`);
      band.addColorStop(1, "transparent");
      ctx.fillStyle = band;
      ctx.fillRect(-w, -h * 0.055, w * 2, h * 0.11);
      ctx.restore();

      for (const s of stars) {
        const tw = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(time * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.gold
          ? `rgba(171,141,96,${0.65 * tw})`
          : `rgba(255,255,255,${0.6 * tw})`;
        ctx.fill();
        if (tw > 0.86 && s.r > 1.25) {
          ctx.strokeStyle = s.gold
            ? `rgba(171,141,96,${0.28 * tw})`
            : `rgba(255,255,255,${0.2 * tw})`;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.moveTo(s.x - s.r * 3.4, s.y);
          ctx.lineTo(s.x + s.r * 3.4, s.y);
          ctx.moveTo(s.x, s.y - s.r * 3.4);
          ctx.lineTo(s.x, s.y + s.r * 3.4);
          ctx.stroke();
        }
      }

      const sh = shootingRef.current;
      if (!sh.on && Math.random() < 0.014) {
        sh.on = true;
        sh.x = Math.random() * w * 0.7;
        sh.y = Math.random() * h * 0.38;
        sh.vx = 9 + Math.random() * 7;
        sh.vy = 2.8 + Math.random() * 2.8;
        sh.life = 1;
      }
      if (sh.on) {
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life -= 0.016;
        if (sh.life <= 0) sh.on = false;
        else {
          const g = ctx.createLinearGradient(sh.x, sh.y, sh.x - 110, sh.y - 38);
          g.addColorStop(0, `rgba(255,248,230,${sh.life})`);
          g.addColorStop(0.35, `rgba(171,141,96,${sh.life * 0.55})`);
          g.addColorStop(1, "transparent");
          ctx.strokeStyle = g;
          ctx.lineWidth = 2.4;
          ctx.beginPath();
          ctx.moveTo(sh.x, sh.y);
          ctx.lineTo(sh.x - 110, sh.y - 38);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
};

const LoadingOverlay: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("active");
  const [blurPx, setBlurPx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const exitedRef = useRef(false);
  const startRef = useRef(Date.now());

  const beginExit = useCallback(() => {
    if (exitedRef.current) return;
    exitedRef.current = true;
    setBlurPx(MAX_BLUR_PX);
    notifyPreloaderComplete();
    setPhase("fade-out");
    window.setTimeout(() => setPhase("hidden"), FADE_MS);
  }, []);

  useEffect(() => {
    startRef.current = Date.now();

    const msgTimer = window.setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 950);

    let raf = 0;
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      // Ease-out progress feel
      const raw = Math.min(1, elapsed / TOTAL_MS);
      setProgress(1 - Math.pow(1 - raw, 1.55));

      if (elapsed >= TOTAL_MS - BLUR_LEAD_MS) {
        const blurT = (elapsed - (TOTAL_MS - BLUR_LEAD_MS)) / BLUR_LEAD_MS;
        setBlurPx(Math.min(MAX_BLUR_PX, blurT * MAX_BLUR_PX));
      }

      if (elapsed >= TOTAL_MS) {
        beginExit();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(msgTimer);
    };
  }, [beginExit]);

  if (phase === "hidden") return null;

  const outer = 2 * Math.PI * 94;
  const inner = 2 * Math.PI * 78;
  const outerOffset = outer * (1 - progress);
  const innerOffset = inner * (1 - Math.min(1, progress * 1.08));
  const pct = Math.round(progress * 100);

  return (
    <div
      className={cn(
        "preloader-cosmos fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden",
        phase === "fade-out" ? "pointer-events-none preloader-exit" : "opacity-100"
      )}
      style={{
        filter: blurPx > 0 ? `blur(${blurPx}px)` : undefined,
      }}
      aria-live="polite"
      aria-busy={phase === "active"}
      aria-label="Loading AI Cosmic Astro"
    >
      <PreloaderCanvas />

      <div className="preloader-aurora pointer-events-none absolute inset-x-0 top-0 h-[58%]" aria-hidden />
      <div className="preloader-cosmic-dust pointer-events-none absolute inset-0" aria-hidden />
      <div className="preloader-vignette pointer-events-none absolute inset-0" aria-hidden />

      <div className="preloader-nebula preloader-nebula-gold pointer-events-none absolute left-[6%] top-[14%] h-72 w-72 sm:h-96 sm:w-96" />
      <div className="preloader-nebula preloader-nebula-mist pointer-events-none absolute right-[4%] top-[18%] h-64 w-64 sm:h-80 sm:w-80" />
      <div className="preloader-nebula preloader-nebula-bronze pointer-events-none absolute bottom-[14%] left-[22%] h-56 w-56" />

      {FLOAT_PLANETS.map((p) => (
        <img key={p.src} src={p.src} alt="" className={p.className} draggable={false} aria-hidden />
      ))}

      <div
        className="preloader-rays pointer-events-none absolute left-1/2 top-[38%] h-[min(110vw,34rem)] w-[min(110vw,34rem)] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />

      <div className="preloader-stage relative z-10 flex w-full max-w-lg flex-col items-center px-5">
        <div className="preloader-wheel relative mb-7 flex h-[min(82vw,20rem)] w-[min(82vw,20rem)] items-center justify-center sm:mb-9 sm:h-[22rem] sm:w-[22rem]">
          {/* Tick ring */}
          <div className="preloader-ticks absolute inset-0" aria-hidden>
            {Array.from({ length: 36 }, (_, i) => (
              <span
                key={i}
                className="preloader-tick"
                style={{ transform: `rotate(${i * 10}deg)` }}
              />
            ))}
          </div>

          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 200 200" aria-hidden>
            <circle cx="100" cy="100" r="94" fill="none" stroke="rgba(171,141,96,0.12)" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <circle
              cx="100"
              cy="100"
              r="94"
              fill="none"
              stroke="url(#preloaderGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={outer}
              strokeDashoffset={outerOffset}
              className="preloader-progress-ring"
            />
            <circle
              cx="100"
              cy="100"
              r="78"
              fill="none"
              stroke="url(#preloaderGradInner)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeDasharray={inner}
              strokeDashoffset={innerOffset}
              className="preloader-progress-ring-inner"
            />
            <defs>
              <linearGradient id="preloaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5e6c8" />
                <stop offset="35%" stopColor="#AB8D60" />
                <stop offset="70%" stopColor="#d4af7a" />
                <stop offset="100%" stopColor="#e8d5b5" />
              </linearGradient>
              <linearGradient id="preloaderGradInner" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#AB8D60" />
                <stop offset="100%" stopColor="#f5e6c8" />
              </linearGradient>
              <filter id="preloaderGlow">
                <feGaussianBlur stdDeviation="2.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          <div className="preloader-ring-glow absolute inset-[2%] rounded-full" />
          <div className="preloader-zodiac-ring absolute inset-[3%] rounded-full border border-[#AB8D60]/40" />
          <div className="preloader-zodiac-ring-inner absolute inset-[11%] rounded-full border border-dashed border-[#AB8D60]/25" />

          <div className="preloader-zodiac-spin absolute inset-[1%]">
            {ZODIAC.map((sign, i) => {
              const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
              const r = 44.5;
              return (
                <span
                  key={sign}
                  className="preloader-zodiac-sign absolute text-base sm:text-lg"
                  style={{
                    left: `${50 + r * Math.cos(angle)}%`,
                    top: `${50 + r * Math.sin(angle)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {sign}
                </span>
              );
            })}
          </div>

          <div className="preloader-zodiac-spin-reverse absolute inset-[8%]">
            {ZODIAC.map((sign, i) => {
              const angle = (i / 12) * Math.PI * 2 + Math.PI / 12;
              const r = 36;
              return (
                <span
                  key={`dot-${sign}`}
                  className="preloader-zodiac-dot absolute h-1 w-1 rounded-full bg-[#E8D5B5]/80 sm:h-1.5 sm:w-1.5"
                  style={{
                    left: `${50 + r * Math.cos(angle)}%`,
                    top: `${50 + r * Math.sin(angle)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              );
            })}
          </div>

          <div className="preloader-orbit preloader-orbit-slow absolute inset-[16%] rounded-full border border-[#AB8D60]/22">
            <img src="/planets/mars.png" alt="" className="preloader-planet-img preloader-planet-img-a" />
          </div>
          <div className="preloader-orbit preloader-orbit-mid absolute inset-[26%] rounded-full border border-[#AB8D60]/18">
            <img src="/planets/jupiter.png" alt="" className="preloader-planet-img preloader-planet-img-b" />
          </div>
          <div className="preloader-orbit preloader-orbit-fast absolute inset-[36%] rounded-full border border-white/10">
            <img src="/planets/venus.png" alt="" className="preloader-planet-img preloader-planet-img-c" />
          </div>

          <div className="preloader-pct-badge absolute -bottom-1 left-1/2 z-20 -translate-x-1/2 translate-y-1/2">
            <span className="font-mono text-[11px] tracking-[0.2em] text-[#E8D5B5]">{pct}%</span>
          </div>
        </div>

        <div className="preloader-card w-full max-w-sm px-5 py-5 text-center sm:px-7 sm:py-6">
          <img
            src={BRAND.LOGO}
            alt={BRAND.NAME}
            className="preloader-logo mx-auto mb-3 w-[min(168px,46vw)] object-contain"
            draggable={false}
          />
          <p className="preloader-brand font-display text-[1.65rem] leading-tight tracking-wide sm:text-3xl">
            {BRAND.NAME}
          </p>
          <p className="preloader-tagline mt-2.5 text-[10px] uppercase tracking-[0.42em] text-[#AB8D60]/85 sm:text-[11px]">
            Cosmic guidance under the stars
          </p>

          <div className="preloader-divider mx-auto my-4" />

          <p key={messageIndex} className="preloader-message min-h-[1.5rem] text-sm text-white/80 sm:text-[15px]">
            {MESSAGES[messageIndex]}
          </p>

          <div className="mx-auto mt-5 h-[3px] w-full max-w-[220px] overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="preloader-bar h-full rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="preloader-constellation pointer-events-none absolute bottom-[7%] left-1/2 flex -translate-x-1/2 items-center gap-2" aria-hidden>
        <span className="preloader-constellation-star" />
        <span className="preloader-constellation-line" />
        <span className="preloader-constellation-star preloader-constellation-star-lg" />
        <span className="preloader-constellation-line" />
        <span className="preloader-constellation-star" />
      </div>
    </div>
  );
};

export default LoadingOverlay;
