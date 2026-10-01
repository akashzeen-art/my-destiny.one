import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { drawTarotCard, type TarotCard } from "@/lib/tarot";
import { cn } from "@/lib/utils";

/** Cosmic Astro Tarot Card Reading — flip cover to reveal meaning. */
const Tarot = () => {
  const [flipped, setFlipped] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [card, setCard] = useState<TarotCard | null>(null);

  const reveal = useCallback(() => {
    if (flipped) return;
    const drawn = drawTarotCard(card?.id);
    setCard(drawn);
    setFlipped(true);
    window.setTimeout(() => setShowInfo(true), 450);
  }, [flipped, card?.id]);

  const drawAgain = () => {
    setShowInfo(false);
    setFlipped(false);
    window.setTimeout(() => {
      const drawn = drawTarotCard(card?.id);
      setCard(drawn);
      setFlipped(true);
      window.setTimeout(() => setShowInfo(true), 450);
    }, 400);
  };

  return (
    <Layout>
      <section className="relative flex flex-1 flex-col pb-20 pt-1">
        <div className="container relative z-[1] mx-auto max-w-5xl px-4">
          <h1 className="cosmic-horoscope-title mb-6 sm:mb-8 md:mb-10">
            Tarot <span>Card</span> Reading
          </h1>

          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,220px)_1fr] md:gap-10 lg:gap-14">
            <div className="flex flex-col items-center">
              <button
                type="button"
                className="cosmic-flip"
                onClick={reveal}
                aria-label={flipped ? "Revealed tarot card" : "Flip tarot card"}
              >
                <div className={cn("cosmic-tarot", flipped && "cosmic-tarot-flipped")}>
                  <div className="cosmic-tarot-face cosmic-tarot-front">
                    {!flipped && <span className="cosmic-guide-btn">Open</span>}
                    <img src="/tarot/cover.png" alt="Tarot card back" draggable={false} />
                  </div>
                  <div className="cosmic-tarot-face cosmic-tarot-back">
                    {card?.image ? (
                      <img src={card.image} alt={card.name} draggable={false} />
                    ) : (
                      <div className="cosmic-tarot-placeholder">
                        <span className="cosmic-tarot-placeholder-label">{card?.name ?? "…"}</span>
                      </div>
                    )}
                  </div>
                </div>
              </button>

              {flipped && (
                <button type="button" onClick={drawAgain} className="cosmic-period-btn mt-5">
                  Draw again
                </button>
              )}
            </div>

            <div
              className={cn(
                "cosmic-infobox p-4 sm:p-5 transition-opacity duration-[3000ms]",
                showInfo ? "opacity-100" : "pointer-events-none opacity-0"
              )}
              aria-hidden={!showInfo}
            >
              {card && (
                <>
                  <h2 className="cosmic-subtitle">{card.name}</h2>
                  <p className="cosmic-basic-text mt-3">{card.meaning}</p>
                  <div className="mt-5">
                    <Link to="/talk-to-astra" className="cosmic-category-btn">
                      Ask Astra to explain your Tarot reading
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tarot;
