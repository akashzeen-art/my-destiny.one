import Layout from "@/components/Layout";
import { usePageT } from "@/lib/pageTranslations";

const IMAGES = ["/horoscope/aries.png", "/horoscope/libra.png", "/horoscope/pisces.png"];

const AboutAstrology = () => {
  const t = usePageT();
  return (
    <Layout>
      <section className="relative flex flex-1 flex-col pb-20 pt-2">
        <div className="container relative z-[1] mx-auto max-w-5xl px-4">
          <h1 className="cosmic-horoscope-title mb-6 sm:mb-10">
            {t.about.title} <span>{t.about.titleHighlight}</span> {t.about.titleSuffix}
          </h1>
          <div className="space-y-10 sm:space-y-14 md:space-y-16">
            {t.about.sections.map((section, idx) => (
              <div key={section.title} className="grid items-center gap-6 sm:grid-cols-2 sm:gap-10 lg:gap-14">
                <div className={idx % 2 === 0 ? "order-2 text-center sm:order-1" : "order-2 text-center sm:order-2"}>
                  <img src={IMAGES[idx]} alt="" className="cosmic-about-image mx-auto" draggable={false} />
                </div>
                <div className={idx % 2 === 0 ? "order-1 flex flex-col sm:order-2" : "order-1 flex flex-col sm:order-1"}>
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
};

export default AboutAstrology;
