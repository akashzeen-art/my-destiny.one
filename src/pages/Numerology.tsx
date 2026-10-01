import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  calcLifePathNumber,
  DAY_OPTIONS,
  MONTH_OPTIONS,
  YEAR_OPTIONS,
} from "@/lib/numerologyCosmic";

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

/** Cosmic Astro — Birthday numerology picker. */
const Numerology = () => {
  const navigate = useNavigate();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState<string | null>(null);

  const years = useMemo(() => YEAR_OPTIONS, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const d = Number(day);
    const m = Number(month);
    const y = Number(year);
    if (!d || !m || !y) {
      setError("Please select your full birthday.");
      return;
    }
    const lifePath = calcLifePathNumber(d, m, y);
    navigate(`/numerology/${lifePath}`, {
      state: { day: d, month: m, year: y, fromBirthday: true },
    });
  };

  return (
    <Layout>
      <section className="relative flex flex-1 flex-col pb-20 pt-2">
        <div className="container relative z-[1] mx-auto max-w-5xl px-4">
          <h1 className="cosmic-horoscope-title mb-6 sm:mb-8">
            Birthday <span>numerology</span>
          </h1>

          <form onSubmit={onSubmit} className="mx-auto mb-8 max-w-4xl">
            <p className="cosmic-basic-text mb-4 pb-1 text-center italic">
              Please select your birthday
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-4">
              <select
                id="day"
                className="cosmic-dropdown"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                aria-label="Day"
              >
                <option value="">Day</option>
                {DAY_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <select
                id="month"
                className="cosmic-dropdown"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                aria-label="Month"
              >
                <option value="">Month</option>
                {MONTH_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                id="year"
                className="cosmic-dropdown"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                aria-label="Year"
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

          <p className="cosmic-basic-text mb-5 text-center italic">Or choose a number</p>

          <div className="mx-auto grid max-w-3xl grid-cols-3 gap-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 lg:gap-1">
            {NUMBERS.map((n) => (
              <Link key={n} to={`/numerology/${n}`} className="cosmic-number-btn">
                {n}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Numerology;
