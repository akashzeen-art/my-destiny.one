import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  CHINESE_YEAR_OPTIONS,
  CHINESE_ZODIAC_SIGNS,
  getChineseSignByYear,
} from "@/lib/chineseZodiac";

/** Cosmic Astro — Chinese horoscope picker. */
const ChineseHoroscope = () => {
  const navigate = useNavigate();
  const [year, setYear] = useState("");
  const [error, setError] = useState<string | null>(null);
  const years = useMemo(() => CHINESE_YEAR_OPTIONS, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const y = Number(year);
    if (!y) {
      setError("Please select your birth year.");
      return;
    }
    const sign = getChineseSignByYear(y);
    navigate(`/chinese-horoscope/${sign.id}`, {
      state: { year: y, fromYear: true },
    });
  };

  return (
    <Layout>
      <section className="relative flex flex-1 flex-col pb-20 pt-2">
        <div className="container relative z-[1] mx-auto max-w-5xl px-4">
          <h1 className="cosmic-horoscope-title mb-6 sm:mb-8">
            Chinese <span>horoscope</span>
          </h1>

          <form onSubmit={onSubmit} className="mx-auto mb-8 max-w-xl">
            <p className="cosmic-basic-text mb-4 text-center italic">
              Please select your birthyear
            </p>

            <div className="grid grid-cols-1 gap-3 sm:mx-auto sm:max-w-md sm:grid-cols-2">
              <select
                id="year"
                className="cosmic-dropdown"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                aria-label="Birth year"
              >
                <option value="">Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>

              <button type="submit" className="cosmic-submit-btn">
                Submit
              </button>
            </div>

            {error && (
              <p className="mt-3 text-center text-sm text-red-300">{error}</p>
            )}
          </form>

          <div className="cosmic-star-divider relative my-10 pt-6">
            <hr className="border-white/80" />
            <span className="cosmic-starx" aria-hidden>
              ✦
            </span>
          </div>

          <p className="cosmic-basic-text mb-6 text-center italic">
            Or choose your Chinese zodiac sign
          </p>

          <div className="mx-auto grid grid-cols-3 gap-y-8 sm:grid-cols-4 sm:gap-y-10 lg:grid-cols-6 lg:gap-y-12">
            {CHINESE_ZODIAC_SIGNS.map((sign) => (
              <Link
                key={sign.id}
                to={`/chinese-horoscope/${sign.id}`}
                className="cosmic-chinese-link text-center"
              >
                <img
                  src={sign.image}
                  alt={sign.name}
                  className="cosmic-chinese-img"
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
};

export default ChineseHoroscope;
