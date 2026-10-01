export const LIFE_PATH_MEANINGS: Record<
  number,
  { title: string; summary: string; traits: string[]; focus: string }
> = {
  1: {
    title: "The Pioneer",
    summary:
      "Number 1 is the spark of new beginnings. You are independent, ambitious, and driven to lead. Your path favors originality and self-reliance — trust your initiative and step forward first.",
    traits: ["Leadership", "Independence", "Courage", "Innovation"],
    focus: "Start boldly and claim your unique voice.",
  },
  2: {
    title: "The Diplomat",
    summary:
      "Number 2 brings harmony, partnership, and sensitivity. You thrive through cooperation and intuition. Balance, patience, and emotional intelligence open doors that force cannot.",
    traits: ["Partnership", "Sensitivity", "Peace", "Intuition"],
    focus: "Build bridges and honor gentle strength.",
  },
  3: {
    title: "The Creator",
    summary:
      "Number 3 radiates expression, joy, and creativity. Communication and artistry are your gifts. Share your ideas freely — inspiration multiplies when you speak from the heart.",
    traits: ["Creativity", "Optimism", "Expression", "Charm"],
    focus: "Create, communicate, and celebrate life.",
  },
  4: {
    title: "The Builder",
    summary:
      "Number 4 is structure, discipline, and lasting foundations. Steady effort builds security. Patience and practicality turn visions into solid reality.",
    traits: ["Stability", "Discipline", "Loyalty", "Hard work"],
    focus: "Lay strong foundations and stay consistent.",
  },
  5: {
    title: "The Adventurer",
    summary:
      "Number 5 seeks freedom, change, and experience. Curiosity fuels your growth. Embrace movement and variety — stagnation is your only true limit.",
    traits: ["Freedom", "Curiosity", "Adaptability", "Adventure"],
    focus: "Explore boldly and welcome change.",
  },
  6: {
    title: "The Nurturer",
    summary:
      "Number 6 is love, responsibility, and care for home and community. You heal through service and beauty. Balance giving with self-care so your light never dims.",
    traits: ["Compassion", "Responsibility", "Harmony", "Family"],
    focus: "Love deeply and create sacred spaces.",
  },
  7: {
    title: "The Seeker",
    summary:
      "Number 7 is wisdom, analysis, and spiritual insight. Solitude and study reveal truth. Trust your inner research — mystery is your teacher.",
    traits: ["Wisdom", "Introspection", "Analysis", "Spirituality"],
    focus: "Seek truth beneath the surface.",
  },
  8: {
    title: "The Powerhouse",
    summary:
      "Number 8 channels ambition, authority, and material mastery. Success comes through ethical power and persistence. Lead with integrity and abundance follows.",
    traits: ["Ambition", "Authority", "Success", "Resilience"],
    focus: "Manifest power with responsibility.",
  },
  9: {
    title: "The Humanitarian",
    summary:
      "Number 9 is completion, compassion, and universal love. You are here to give back and inspire. Release what has ended — your wisdom lights the way for others.",
    traits: ["Compassion", "Idealism", "Wisdom", "Generosity"],
    focus: "Serve the greater good and complete cycles.",
  },
};

/** Reduce a number to a single digit 1–9 (Cosmic Astro grid). */
export function reduceToSingleDigit(n: number): number {
  let x = Math.abs(Math.floor(n));
  while (x > 9) {
    x = String(x)
      .split("")
      .reduce((sum, d) => sum + Number(d), 0);
  }
  return x === 0 ? 9 : x;
}

/** Life Path from day / month / year (all digits summed). */
export function calcLifePathNumber(day: number, month: number, year: number): number {
  const digits = `${day}${month}${year}`
    .split("")
    .map(Number)
    .filter((d) => !Number.isNaN(d));
  const sum = digits.reduce((a, b) => a + b, 0);
  return reduceToSingleDigit(sum);
}

export function getNumberMeaning(n: number) {
  const num = reduceToSingleDigit(n);
  return { number: num, ...LIFE_PATH_MEANINGS[num] };
}

export const CURRENT_YEAR = new Date().getFullYear();
export const YEAR_OPTIONS = Array.from({ length: CURRENT_YEAR - 1925 }, (_, i) => CURRENT_YEAR - i);
export const DAY_OPTIONS = Array.from({ length: 31 }, (_, i) => i + 1);
export const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);
