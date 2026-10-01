import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ZODIAC_SIGNS } from "@/lib/horoscope";

/** Cosmic Astro horoscope picker — matches Hororscope feature reference. */
const Horoscope = () => (
  <Layout>
    <section className="relative flex flex-1 flex-col pb-20 pt-1">
      <div className="container relative z-[1] mx-auto max-w-6xl px-3 sm:px-4">
        <h1 className="cosmic-horoscope-title mb-6 sm:mb-8 md:mb-10">
          Choose Your Zodiac Sign
        </h1>

        {/* Bootstrap-equivalent: col-4 / col-sm-3 / col-lg-2 */}
        <div className="mx-auto grid grid-cols-3 gap-y-4 sm:grid-cols-4 sm:gap-y-6 lg:grid-cols-6 lg:gap-y-8">
          {ZODIAC_SIGNS.map((sign) => (
            <Link
              key={sign.id}
              to={`/horoscope/${sign.id}`}
              className="cosmic-sign-link text-center"
            >
              <img
                src={sign.image}
                alt={sign.name}
                className="cosmic-sign-img"
                draggable={false}
              />
              <div className="cosmic-sign-name">{sign.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Horoscope;
