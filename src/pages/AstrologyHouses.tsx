import Layout from "@/components/Layout";
import { usePageT } from "@/lib/pageTranslations";

const AstrologyHouses = () => {
  const t = usePageT();
  const h = t.houses;
  return (
    <Layout>
      <section className="relative flex flex-1 flex-col pb-20 pt-2">
        <div className="container relative z-[1] mx-auto max-w-5xl px-4">
          <h1 className="cosmic-horoscope-title mb-6 sm:mb-10">
            {h.title} <span>{h.titleHighlight}</span> {h.titleSuffix}
          </h1>
          <div className="space-y-10 sm:space-y-14 md:space-y-16">
            <div className="grid items-center gap-6 sm:grid-cols-2 sm:gap-10 lg:gap-14">
              <div className="order-2 text-center sm:order-1">
                <img src="/horoscope/virgo.png" alt="" className="cosmic-about-image mx-auto" draggable={false} />
              </div>
              <div className="order-1 flex flex-col sm:order-2">
                <h2 className="cosmic-subtitle">{h.aboutTitle}</h2>
                <div className="cosmic-basic-text mt-3 space-y-4">
                  <p>{h.aboutP1}</p>
                  <p>{h.aboutP2}</p>
                </div>
              </div>
            </div>
            <div className="grid items-center gap-6 sm:grid-cols-2 sm:gap-10 lg:gap-14">
              <div className="order-1 flex flex-col">
                <h2 className="cosmic-subtitle">{h.roadmapTitle}</h2>
                <div className="cosmic-basic-text mt-3 space-y-4">
                  <p>{h.roadmapP1}</p>
                  <p>{h.roadmapP2}</p>
                  <p className="font-medium text-[#AB8D60]">{h.overviewLabel}</p>
                  <ul className="cosmic-house-list">
                    {h.houses.map((item) => (
                      <li key={item.house}><strong>{item.house}:</strong> {item.theme} ({item.ruler})</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="order-2 text-center">
                <img src="/horoscope/gemini.png" alt="" className="cosmic-about-image mx-auto" draggable={false} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AstrologyHouses;
