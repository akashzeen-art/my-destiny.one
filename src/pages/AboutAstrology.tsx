import Layout from "@/components/Layout";

const SECTIONS = [
  {
    title: "What is Astrology?",
    image: "/horoscope/aries.png",
    imageLeft: true,
    text: `Astrology is the study of the relationship between the position of celestial bodies and events on Earth. Astrologers believe that understanding the impact between planets and the natural world can predict potential future events. Many cultures have practiced astrology for centuries and have created their own variations, including: Chinese, Vedas, Tibet, Western.
What most people know about astrology is its "sign". It refers to one of the 12 constellations of the zodiac, which is a form of horoscope. This is the simplest form, as all you need to create a horoscope is a person's birthday.`,
  },
  {
    title: "Is astrology a science?",
    image: "/horoscope/libra.png",
    imageLeft: false,
    text: `Most people think of astrology as a pseudoscience, but it overlaps with both astronomy and psychology. Astrologers use astronomy to track the movement of planets and asteroids. You need to know where all the constellations are, how long it takes the planet to cross the sign, and most importantly, where all the celestial bodies are in the sky at that moment. Astrologers also often use mathematics to calculate the exact angle of a planet and determine its aspect. This information can be used by astrologers to analyze accordingly.`,
  },
  {
    title: "Can astrology predict the future?",
    image: "/horoscope/pisces.png",
    imageLeft: true,
    text: `The answer to this question is complicated. Basically, astrology can be used to predict potential events. We call it "potential" because free will has as much impact on your personal life as the movement of the planet.
For example, let's say your horoscope warns you that a division is imminent. So you start working on your relationship, getting more communication, and you really never break up. Instead, your relationship is stronger than ever. What do you get? Your horoscope was not "wrong", it allowed you to change your destiny by simply taking advantage of what was not working. Astrology sheds light on what needs attention, but it is our responsibility to work and make positive changes.`,
  },
] as const;

/** Cosmic Astro — All About Astrology educational page. */
const AboutAstrology = () => (
  <Layout>
    <section className="relative flex flex-1 flex-col pb-20 pt-2">
      <div className="container relative z-[1] mx-auto max-w-5xl px-4">
        <h1 className="cosmic-horoscope-title mb-6 sm:mb-10">
          All <span>About</span> Astrology
        </h1>

        <div className="space-y-10 sm:space-y-14 md:space-y-16">
          {SECTIONS.map((section) => (
            <div
              key={section.title}
              className="grid items-center gap-6 sm:grid-cols-2 sm:gap-10 lg:gap-14"
            >
              <div
                className={
                  section.imageLeft
                    ? "order-2 text-center sm:order-1"
                    : "order-2 text-center sm:order-2"
                }
              >
                <img
                  src={section.image}
                  alt=""
                  className="cosmic-about-image mx-auto"
                  draggable={false}
                />
              </div>

              <div
                className={
                  section.imageLeft
                    ? "order-1 flex flex-col sm:order-2"
                    : "order-1 flex flex-col sm:order-1"
                }
              >
                <h2 className="cosmic-subtitle">{section.title}</h2>
                <p className="cosmic-basic-text mt-3 whitespace-pre-line">{section.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default AboutAstrology;
