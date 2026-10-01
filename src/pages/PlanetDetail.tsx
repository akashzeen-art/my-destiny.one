import { Link, Navigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { getPlanetById } from "@/lib/planets";

const PlanetDetail = () => {
  const { planetId } = useParams<{ planetId: string }>();
  const planet = getPlanetById(planetId);

  if (!planet) {
    return <Navigate to="/planets" replace />;
  }

  return (
    <Layout>
      <section className="relative flex flex-1 flex-col pb-20 pt-2">
        <div className="container relative z-[1] mx-auto max-w-3xl px-4 text-center">
          <img
            src={planet.image}
            alt={planet.name}
            className="cosmic-sign-img cosmic-sign-img-lg mx-auto mb-4"
            draggable={false}
          />

          <h1 className="cosmic-horoscope-title mb-2">
            {planet.name} <span>Meaning</span>
          </h1>

          <p className="cosmic-date-range mb-6">{planet.rules}</p>

          <p className="cosmic-basic-text mx-auto mb-6 max-w-2xl text-center sm:text-left">
            {planet.summary}
          </p>

          <div className="cosmic-infobox mx-auto mb-6 p-5 text-left">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#AB8D60]">
              Keywords
            </p>
            <ul className="cosmic-check-list">
              {planet.keywords.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to="/planets" className="cosmic-category-btn inline-flex max-w-xs">
              Choose another planet
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

export default PlanetDetail;
