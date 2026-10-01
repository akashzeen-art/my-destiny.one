import Layout from "@/components/Layout";

const HOUSES = [
  { house: "1st house", theme: "Self-Image", ruler: "Aries" },
  { house: "2nd house", theme: "Self-Worth and Money", ruler: "Taurus" },
  { house: "3rd house", theme: "Communication", ruler: "Gemini" },
  { house: "4th house", theme: "Family, Home, Roots, Security", ruler: "Cancer" },
  { house: "5th house", theme: "Self-Expression, Creativity, Pleasure, Romance", ruler: "Leo" },
  { house: "6th house", theme: "Work, Health", ruler: "Virgo" },
  { house: "7th house", theme: "Partnership, Marriage", ruler: "Libra" },
  { house: "8th house", theme: "Transformation, Sexuality", ruler: "Scorpio" },
  { house: "9th house", theme: "Belief Systems, Higher Learning", ruler: "Sagittarius" },
  { house: "10th house", theme: "Profession, Responsibility, Reputation", ruler: "Capricorn" },
  { house: "11th house", theme: "Aspirations, Personal Goals, Groups", ruler: "Aquarius" },
  { house: "12th house", theme: "Soul Growth, Privacy, Secrets", ruler: "Pisces" },
] as const;

/** Cosmic Astro — All About Astrology Houses. */
const AstrologyHouses = () => (
  <Layout>
    <section className="relative flex flex-1 flex-col pb-20 pt-2">
      <div className="container relative z-[1] mx-auto max-w-5xl px-4">
        <h1 className="cosmic-horoscope-title mb-6 sm:mb-10">
          All <span>About</span> Astrology Houses
        </h1>

        <div className="space-y-10 sm:space-y-14 md:space-y-16">
          {/* Section 1 — image left on desktop (order like Cosmic Astro) */}
          <div className="grid items-center gap-6 sm:grid-cols-2 sm:gap-10 lg:gap-14">
            <div className="order-2 text-center sm:order-1">
              <img
                src="/horoscope/virgo.png"
                alt=""
                className="cosmic-about-image mx-auto"
                draggable={false}
              />
            </div>
            <div className="order-1 flex flex-col sm:order-2">
              <h2 className="cosmic-subtitle">About Houses</h2>
              <div className="cosmic-basic-text mt-3 space-y-4">
                <p>
                  The zodiac is divided into 12 segments called houses, and each of them is ruled by
                  a different zodiac sign. Each house represents a key part of life, from health to
                  money to relationships and everything in between. They all have a specific set of
                  traits, beginning from the self, and expanding outward into society and beyond.
                </p>
                <p>
                  You can view the 12 astrology houses as a clock. A clock is divided into 12
                  segments. Like a clock, the zodiac begins with the first house, and then goes
                  counterclockwise around. The first six houses are known as the “personal houses,”
                  while the last six houses are known as the “interpersonal houses.”
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 — text left, image right */}
          <div className="grid items-center gap-6 sm:grid-cols-2 sm:gap-10 lg:gap-14">
            <div className="order-1 flex flex-col">
              <h2 className="cosmic-subtitle">Roadmap to the present</h2>
              <div className="cosmic-basic-text mt-3 space-y-4">
                <p>
                  The houses are a roadmap for understanding your past, present, and future. When
                  you’re born, each planet was in a certain house. Those houses can be seen in your
                  birth chart. Your birth chart is basically a snapshot of the sky at your moment of
                  birth. Not only the day you were born but also the exact time.
                </p>
                <p>
                  All this information can give you valuable insights. Not just about your own
                  personality, but also how you coexist with the world around you.
                </p>
                <p className="font-medium text-[#AB8D60]">
                  Overview of the houses and by whom it is ruled
                </p>
                <ul className="cosmic-house-list">
                  {HOUSES.map((h) => (
                    <li key={h.house}>
                      <strong>{h.house}:</strong> {h.theme} ({h.ruler})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="order-2 text-center">
              <img
                src="/horoscope/gemini.png"
                alt=""
                className="cosmic-about-image mx-auto"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default AstrologyHouses;
