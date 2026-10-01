import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { getNumberMeaning } from "@/lib/numerologyCosmic";

type LocationState = {
  day?: number;
  month?: number;
  year?: number;
  fromBirthday?: boolean;
} | null;

const NumerologyNumber = () => {
  const { numberId } = useParams<{ numberId: string }>();
  const location = useLocation();
  const state = (location.state as LocationState) || null;
  const n = Number(numberId);

  if (!numberId || Number.isNaN(n) || n < 1 || n > 9) {
    return <Navigate to="/numerology" replace />;
  }

  const meaning = getNumberMeaning(n);

  return (
    <Layout>
      <section className="relative flex flex-1 flex-col pb-20 pt-2">
        <div className="container relative z-[1] mx-auto max-w-3xl px-4 text-center">
          <h1 className="cosmic-horoscope-title mb-6">
            Number <span>{meaning.number}</span>
          </h1>

          <div className="cosmic-number-btn cosmic-big-number mx-auto mb-6 pointer-events-none">
            {meaning.number}
          </div>

          {state?.fromBirthday && state.day && state.month && state.year && (
            <p className="cosmic-date-range mb-4">
              Birthday {state.day}/{state.month}/{state.year} · Life Path {meaning.number}
            </p>
          )}

          <h2 className="cosmic-subtitle mb-3 text-center">{meaning.title}</h2>
          <p className="cosmic-basic-text mx-auto mb-6 max-w-2xl text-center sm:text-left">
            {meaning.summary}
          </p>

          <div className="cosmic-infobox mx-auto mb-6 p-5 text-left">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#AB8D60]">Key traits</p>
            <ul className="cosmic-check-list">
              {meaning.traits.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="cosmic-basic-text mt-4 italic">
              <span className="text-[#AB8D60]">Focus:</span> {meaning.focus}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to="/numerology" className="cosmic-category-btn inline-flex max-w-xs">
              Choose another number
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

export default NumerologyNumber;
