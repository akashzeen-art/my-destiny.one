export type ZodiacId =
  | "Aries"
  | "Taurus"
  | "Gemini"
  | "Cancer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Scorpio"
  | "Sagittarius"
  | "Capricorn"
  | "Aquarius"
  | "Pisces";

export interface ZodiacSign {
  id: ZodiacId;
  name: string;
  symbol: string;
  image: string;
  dates: string;
  element: string;
  rulingPlanet: string;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: "Aries", name: "Aries", symbol: "♈", image: "/horoscope/aries.png", dates: "Mar 21 – Apr 19", element: "Fire", rulingPlanet: "Mars" },
  { id: "Taurus", name: "Taurus", symbol: "♉", image: "/horoscope/taurus.png", dates: "Apr 20 – May 20", element: "Earth", rulingPlanet: "Venus" },
  { id: "Gemini", name: "Gemini", symbol: "♊", image: "/horoscope/gemini.png", dates: "May 21 – Jun 20", element: "Air", rulingPlanet: "Mercury" },
  { id: "Cancer", name: "Cancer", symbol: "♋", image: "/horoscope/cancer.png", dates: "Jun 21 – Jul 22", element: "Water", rulingPlanet: "Moon" },
  { id: "Leo", name: "Leo", symbol: "♌", image: "/horoscope/leo.png", dates: "Jul 23 – Aug 22", element: "Fire", rulingPlanet: "Sun" },
  { id: "Virgo", name: "Virgo", symbol: "♍", image: "/horoscope/virgo.png", dates: "Aug 23 – Sep 22", element: "Earth", rulingPlanet: "Mercury" },
  { id: "Libra", name: "Libra", symbol: "♎", image: "/horoscope/libra.png", dates: "Sep 23 – Oct 22", element: "Air", rulingPlanet: "Venus" },
  { id: "Scorpio", name: "Scorpio", symbol: "♏", image: "/horoscope/scorpio.png", dates: "Oct 23 – Nov 21", element: "Water", rulingPlanet: "Pluto" },
  { id: "Sagittarius", name: "Sagittarius", symbol: "♐", image: "/horoscope/sagittarius.png", dates: "Nov 22 – Dec 21", element: "Fire", rulingPlanet: "Jupiter" },
  { id: "Capricorn", name: "Capricorn", symbol: "♑", image: "/horoscope/capricorn.png", dates: "Dec 22 – Jan 19", element: "Earth", rulingPlanet: "Saturn" },
  { id: "Aquarius", name: "Aquarius", symbol: "♒", image: "/horoscope/aquarius.png", dates: "Jan 20 – Feb 18", element: "Air", rulingPlanet: "Uranus" },
  { id: "Pisces", name: "Pisces", symbol: "♓", image: "/horoscope/pisces.png", dates: "Feb 19 – Mar 20", element: "Water", rulingPlanet: "Neptune" },
];

export type HoroscopePeriod = "daily" | "weekly" | "monthly";

const THEMES = [
  "love",
  "career",
  "health",
  "finances",
  "intuition",
  "friendship",
  "creativity",
  "travel",
] as const;

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(arr: readonly T[], seed: number, offset = 0): T {
  return arr[(seed + offset) % arr.length];
}

const OPENERS: Record<HoroscopePeriod, string[]> = {
  daily: [
    "The stars align gently for you today.",
    "A quiet cosmic shift opens new awareness today.",
    "Today carries a soft invitation from the cosmos.",
    "Celestial currents favor clarity and courage today.",
  ],
  weekly: [
    "This week unfolds as a chapter of meaningful progress.",
    "The planetary rhythm this week supports steady growth.",
    "A week of subtle breakthroughs awaits you.",
    "Cosmic winds this week favor intentional action.",
  ],
  monthly: [
    "This month asks you to trust your deeper vision.",
    "A broader celestial cycle opens across the month.",
    "This month rewards patience, wisdom, and heart.",
    "The skies this month illuminate long-term purpose.",
  ],
};

const BODY: Record<(typeof THEMES)[number], string[]> = {
  love: [
    "In matters of the heart, honesty softens every threshold. Express care without fear of being seen.",
    "Romance favors sincerity over spectacle. A small gesture can unlock unexpected warmth.",
    "Emotional bonds deepen when you listen as much as you speak.",
  ],
  career: [
    "Professionally, a thoughtful step today can open doors you have been preparing for.",
    "Your diligence is noticed. Lead with calm confidence rather than haste.",
    "Collaboration brings opportunity — share ideas freely and invite wise counsel.",
  ],
  health: [
    "Tend to your body with gentle consistency. Rest is as sacred as effort.",
    "Balance movement and stillness; your vitality returns when you honor both.",
    "Nourish yourself simply — water, breath, and quiet moments restore clarity.",
  ],
  finances: [
    "Money flows where intention is clear. Avoid impulsive leaps; favor steady planning.",
    "A practical review of resources brings peace and unexpected openings.",
    "Generosity and discipline can coexist — give wisely and save with purpose.",
  ],
  intuition: [
    "Trust the quiet knowing beneath the noise. Your inner compass is unusually sharp.",
    "Dreams and subtle signs carry guidance — pause long enough to receive them.",
    "Intuition speaks softly today; protect your stillness from unnecessary distraction.",
  ],
  friendship: [
    "A friend may need your presence more than advice. Show up with warmth.",
    "Social connections renew your spirit. Reach out to someone you have missed.",
    "Shared laughter lightens heavy thoughts — seek kindred company.",
  ],
  creativity: [
    "Creative energy rises. Begin something imperfect and let inspiration refine it.",
    "Art, music, or writing can unlock answers the mind alone cannot reach.",
    "Play without pressure — curiosity is your muse this cycle.",
  ],
  travel: [
    "Movement — near or far — refreshes perspective. Even a short walk shifts fate.",
    "A change of scenery invites insight. Follow the path that feels quietly right.",
    "Exploration need not be grand; curiosity itself is the journey.",
  ],
};

const CLOSERS = [
  "Carry this guidance lightly and walk with grace.",
  "The cosmos walks beside you — stay open.",
  "Let wisdom settle, then act when the moment feels true.",
  "Astra watches with you under these same stars.",
];

export function getZodiacById(id: string | undefined): ZodiacSign | undefined {
  if (!id) return undefined;
  const normalized = id.charAt(0).toUpperCase() + id.slice(1).toLowerCase();
  return ZODIAC_SIGNS.find(
    (z) => z.id.toLowerCase() === id.toLowerCase() || z.name === normalized
  );
}

export function getHoroscopeReading(sign: ZodiacSign, period: HoroscopePeriod) {
  const dayKey =
    period === "daily"
      ? new Date().toISOString().slice(0, 10)
      : period === "weekly"
        ? `${new Date().getFullYear()}-W${Math.ceil(
            ((Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / 86400000 +
              new Date(new Date().getFullYear(), 0, 1).getDay() +
              1) /
              7
          )}`
        : new Date().toISOString().slice(0, 7);

  const seed = hashSeed(`${sign.id}-${period}-${dayKey}`);
  const themeA = pick(THEMES, seed, 1);
  const themeB = pick(THEMES, seed, 4);
  const opener = pick(OPENERS[period], seed, 2);
  const lineA = pick(BODY[themeA], seed, 3);
  const lineB = pick(BODY[themeB], seed, 7);
  const closer = pick(CLOSERS, seed, 5);

  const luck = 55 + (seed % 40);
  const mood = pick(
    ["Hopeful", "Focused", "Serene", "Inspired", "Courageous", "Reflective", "Joyful"],
    seed,
    6
  );

  return {
    period,
    title: `${sign.name} — ${period.charAt(0).toUpperCase()}${period.slice(1)} Horoscope`,
    text: `${opener} ${lineA} ${lineB} ${closer}`,
    mood,
    luck,
    themes: [themeA, themeB],
    dateLabel:
      period === "daily"
        ? new Date().toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : period === "weekly"
          ? "This Week"
          : new Date().toLocaleDateString(undefined, { month: "long", year: "numeric" }),
  };
}
