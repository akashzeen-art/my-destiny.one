import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  getHoroscopeReading,
  getZodiacById,
  type HoroscopePeriod,
} from "@/lib/horoscope";
import { cn } from "@/lib/utils";

const PERIODS: { id: HoroscopePeriod; label: string }[] = [
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
];

const HoroscopeSign = () => {
  const { signId } = useParams<{ signId: string }>();
  const sign = getZodiacById(signId);
  const [period, setPeriod] = useState<HoroscopePeriod>("daily");

  const reading = useMemo(
    () => (sign ? getHoroscopeReading(sign, period) : null),
    [sign, period]
  );

  if (!sign || !reading) {
    return <Navigate to="/horoscope" replace />;
  }

  return (
    <Layout>
      <section className="relative flex flex-1 flex-col px-4 pb-20 pt-2">
        <div className="container relative z-[1] mx-auto max-w-3xl">
          <div className="mb-5 text-center sm:mb-8">
            <img
              src={sign.image}
              alt={sign.name}
              className="cosmic-sign-img cosmic-sign-img-lg mx-auto mb-3"
              draggable={false}
            />
            <h1 className="cosmic-horoscope-title mb-2">
              {sign.name} <span>Horoscope</span>
            </h1>
            <p className="cosmic-date-range">{sign.dates}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/45">
              {sign.element} · Ruled by {sign.rulingPlanet}
            </p>
          </div>

          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {PERIODS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPeriod(p.id)}
                className={cn(
                  "cosmic-period-btn",
                  period === p.id && "cosmic-period-btn-active"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="cosmic-reading-card mx-auto mb-6">
            <p className="mb-3 text-center text-xs uppercase tracking-[0.25em] text-[#AB8D60]/90">
              {reading.dateLabel}
            </p>
            <p className="text-center text-sm leading-relaxed text-white/90 sm:text-base sm:leading-relaxed">
              {reading.text}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <div className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-center">
                <p className="text-[10px] uppercase tracking-wider text-white/45">Mood</p>
                <p className="text-sm font-semibold text-white">{reading.mood}</p>
              </div>
              <div className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-center">
                <p className="text-[10px] uppercase tracking-wider text-white/45">Luck</p>
                <p className="text-sm font-semibold text-[#AB8D60]">{reading.luck}%</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/horoscope" className="cosmic-category-btn inline-flex max-w-xs mx-auto">
              Choose another sign
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HoroscopeSign;
