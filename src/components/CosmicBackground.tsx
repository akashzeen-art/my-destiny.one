/**
 * AI Cosmic Astro backdrop — deep charcoal sky, layered stars,
 * milky haze, celestial chart, orbiting & drifting planets.
 */
const ORBIT_PLANETS = [
  { src: "/planets/mars.png", ring: "a", className: "cosmic-bg-planet-mars" },
  { src: "/planets/jupiter.png", ring: "a", className: "cosmic-bg-planet-jupiter" },
  { src: "/planets/mercury.png", ring: "a", className: "cosmic-bg-planet-mercury" },
  { src: "/planets/saturn.png", ring: "b", className: "cosmic-bg-planet-saturn" },
  { src: "/planets/venus.png", ring: "b", className: "cosmic-bg-planet-venus" },
  { src: "/planets/pluto.png", ring: "c", className: "cosmic-bg-planet-pluto" },
] as const;

const DRIFT_PLANETS = [
  { src: "/planets/neptune.png", className: "cosmic-bg-drift cosmic-bg-drift-neptune" },
  { src: "/planets/uranus.png", className: "cosmic-bg-drift cosmic-bg-drift-uranus" },
  { src: "/planets/moon.png", className: "cosmic-bg-drift cosmic-bg-drift-moon" },
  { src: "/planets/sun.png", className: "cosmic-bg-drift cosmic-bg-drift-sun" },
] as const;

const CosmicBackground = () => (
  <div className="cosmic-bg-root fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
    <div className="cosmic-sky absolute inset-0" />
    <div className="cosmic-depth-glow absolute inset-0" />
    <div className="cosmic-nebula-soft absolute inset-0" />
    <div className="cosmic-milkyway absolute inset-0" />
    <div className="cosmic-stars cosmic-stars-far absolute inset-0" />
    <div className="cosmic-stars absolute inset-0" />
    <div className="cosmic-bigstars absolute inset-0" />
    <div className="cosmic-shooting absolute inset-0" />

    <div className="cosmic-startline absolute" />

    <div className="cosmic-orbit-ring cosmic-orbit-ring-a absolute">
      {ORBIT_PLANETS.filter((p) => p.ring === "a").map((p) => (
        <img key={p.src} src={p.src} alt="" className={`cosmic-bg-planet ${p.className}`} draggable={false} />
      ))}
    </div>
    <div className="cosmic-orbit-ring cosmic-orbit-ring-b absolute">
      {ORBIT_PLANETS.filter((p) => p.ring === "b").map((p) => (
        <img key={p.src} src={p.src} alt="" className={`cosmic-bg-planet ${p.className}`} draggable={false} />
      ))}
    </div>
    <div className="cosmic-orbit-ring cosmic-orbit-ring-c absolute">
      {ORBIT_PLANETS.filter((p) => p.ring === "c").map((p) => (
        <img key={p.src} src={p.src} alt="" className={`cosmic-bg-planet ${p.className}`} draggable={false} />
      ))}
    </div>

    {DRIFT_PLANETS.map((p) => (
      <img key={p.src} src={p.src} alt="" className={p.className} draggable={false} />
    ))}

    <div className="cosmic-planet-glow cosmic-planet-glow-sun absolute" />
    <div className="cosmic-clouds absolute inset-0" />
    <div className="cosmic-vignette absolute inset-0" />
  </div>
);

export default CosmicBackground;
