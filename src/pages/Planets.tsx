import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { PLANETS } from "@/lib/planets";

/** Cosmic Astro — Meaning of Planets grid. */
const Planets = () => (
  <Layout>
    <section className="relative flex flex-1 flex-col pb-20 pt-2">
      <div className="container relative z-[1] mx-auto max-w-5xl px-4">
        <h1 className="cosmic-horoscope-title mb-6 sm:mb-8 md:mb-10">
          Meaning of <span>Planets</span>
        </h1>

        <div className="mx-auto grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-3 md:grid-cols-5 md:gap-y-8">
          {PLANETS.map((planet) => (
            <Link
              key={planet.id}
              to={`/planets/${planet.id}`}
              className="cosmic-sign-link text-center"
            >
              <img
                src={planet.image}
                alt={planet.name}
                className="cosmic-sign-img"
                draggable={false}
              />
              <div className="cosmic-sign-name">{planet.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Planets;
