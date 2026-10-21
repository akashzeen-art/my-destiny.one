import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ZODIAC_SIGNS } from "@/lib/horoscope";
import { usePageT } from "@/lib/pageTranslations";

const Horoscope = () => {
  const t = usePageT();
  return (
    <Layout>
      <section className="relative flex flex-1 flex-col pb-20 pt-1">
        <div className="container relative z-[1] mx-auto max-w-6xl px-3 sm:px-4">
          <h1 className="cosmic-horoscope-title mb-6 sm:mb-8 md:mb-10">{t.horoscope.title}</h1>
          <div className="mx-auto grid grid-cols-3 gap-y-4 sm:grid-cols-4 sm:gap-y-6 lg:grid-cols-6 lg:gap-y-8">
            {ZODIAC_SIGNS.map((sign) => (
              <Link key={sign.id} to={`/horoscope/${sign.id}`} className="cosmic-sign-link text-center">
                <img src={sign.image} alt={sign.name} className="cosmic-sign-img" draggable={false} />
                <div className="cosmic-sign-name">{sign.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Horoscope;
