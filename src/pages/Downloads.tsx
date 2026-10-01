import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

const DOWNLOADS = [
  {
    title: "Daily Horoscope Guide",
    desc: "A printable overview of how to read your daily Cosmic Astro horoscope.",
    href: "/horoscope",
  },
  {
    title: "Zodiac Sign Chart",
    desc: "Browse all twelve signs with dates, elements, and ruling planets.",
    href: "/horoscope",
  },
  {
    title: "Tarot Major Arcana",
    desc: "Explore the Major Arcana meanings and draw a card for guidance.",
    href: "/tarot",
  },
  {
    title: "Numerology Numbers",
    desc: "Open the life-path number library and save insights for later.",
    href: "/numerology",
  },
] as const;

/** Cosmic Astro — Downloads menu destination. */
const Downloads = () => (
  <Layout>
    <section className="relative flex flex-1 flex-col pb-20 pt-2">
      <div className="container relative z-[1] mx-auto max-w-3xl px-4">
        <h1 className="cosmic-horoscope-title mb-4 text-center">
          Cosmic <span>Downloads</span>
        </h1>
        <p className="cosmic-basic-text mx-auto mb-8 max-w-xl text-center">
          Save and revisit your favorite Cosmic Astro guides. Open a resource below to
          explore and keep learning under the stars.
        </p>

        <ul className="space-y-3">
          {DOWNLOADS.map((item) => (
            <li key={item.title}>
              <Link
                to={item.href}
                className="cosmic-infobox block p-5 text-left transition hover:border-[#AB8D60]/40"
              >
                <p className="mb-1 font-medium text-white">{item.title}</p>
                <p className="text-sm text-white/60">{item.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </Layout>
);

export default Downloads;
