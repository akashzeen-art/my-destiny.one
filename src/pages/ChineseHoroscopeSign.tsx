import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { getChineseSignById } from "@/lib/chineseZodiac";

type LocationState = { year?: number; fromYear?: boolean } | null;

const ChineseHoroscopeSign = () => {
  const { animalId } = useParams<{ animalId: string }>();
  const location = useLocation();
  const state = (location.state as LocationState) || null;
  const sign = getChineseSignById(animalId);

  if (!sign) {
    return <Navigate to="/chinese-horoscope" replace />;
  }

  return (
    <Layout>
      <section className="relative flex flex-1 flex-col pb-20 pt-2">
        <div className="container relative z-[1] mx-auto max-w-3xl px-4 text-center">
          <h1 className="cosmic-horoscope-title mb-6">
            {sign.name} <span>Chinese Zodiac</span>
          </h1>

          <img
            src={sign.image}
            alt={sign.name}
            className="cosmic-chinese-img cosmic-chinese-img-lg mx-auto mb-4"
            draggable={false}
          />

          {state?.fromYear && state.year && (
            <p className="cosmic-date-range mb-3">
              Birth year {state.year} · {sign.name}
            </p>
          )}

          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/45">
            Element · {sign.element}
          </p>

          <p className="cosmic-basic-text mx-auto mb-6 max-w-2xl text-center sm:text-left">
            {sign.summary}
          </p>

          <div className="cosmic-infobox mx-auto mb-6 p-5 text-left">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#AB8D60]">
              Key traits
            </p>
            <ul className="cosmic-check-list">
              {sign.traits.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/chinese-horoscope"
              className="cosmic-category-btn inline-flex max-w-xs"
            >
              Choose another sign
            </Link>
            <Link to="/talk-to-astra" className="cosmic-category-btn inline-flex max-w-xs">
              Ask Astra to explain
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ChineseHoroscopeSign;
