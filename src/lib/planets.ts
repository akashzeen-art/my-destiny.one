export type PlanetId =
  | "sun"
  | "moon"
  | "mercury"
  | "venus"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune"
  | "pluto";

export interface Planet {
  id: PlanetId;
  name: string;
  image: string;
  rules: string;
  keywords: string[];
  summary: string;
}

export const PLANETS: Planet[] = [
  {
    id: "sun",
    name: "The Sun",
    image: "/planets/sun.png",
    rules: "Leo · 5th House",
    keywords: ["Identity", "Vitality", "Ego", "Purpose"],
    summary:
      "The Sun is the core of your chart — the light of identity, vitality, and conscious purpose. It shows how you shine, lead, and express your essential self. When the Sun is strong in your life, confidence and creative will rise; honor it by living authentically.",
  },
  {
    id: "moon",
    name: "The Moon",
    image: "/planets/moon.png",
    rules: "Cancer · 4th House",
    keywords: ["Emotions", "Instinct", "Home", "Nurture"],
    summary:
      "The Moon governs feelings, instincts, and the private self. It reveals what makes you feel safe and how you nurture others. Follow lunar wisdom by honoring your emotional tides and creating sanctuary in daily life.",
  },
  {
    id: "mercury",
    name: "Mercury",
    image: "/planets/mercury.png",
    rules: "Gemini & Virgo · 3rd & 6th Houses",
    keywords: ["Mind", "Communication", "Learning", "Curiosity"],
    summary:
      "Mercury rules thought, speech, and connection. It shows how you learn, write, and exchange ideas. Clear Mercury energy favors curiosity, witty dialogue, and practical problem-solving — keep learning and stay flexible.",
  },
  {
    id: "venus",
    name: "Venus",
    image: "/planets/venus.png",
    rules: "Taurus & Libra · 2nd & 7th Houses",
    keywords: ["Love", "Beauty", "Harmony", "Values"],
    summary:
      "Venus speaks of love, beauty, pleasure, and what you value. It colors attraction, artistry, and how you create harmony. Cultivate Venus by surrounding yourself with beauty and relating with kindness and balance.",
  },
  {
    id: "mars",
    name: "Mars",
    image: "/planets/mars.png",
    rules: "Aries · 1st House",
    keywords: ["Drive", "Courage", "Action", "Desire"],
    summary:
      "Mars is drive, courage, and raw will. It shows how you pursue goals, assert boundaries, and channel desire. Healthy Mars acts with purpose — move boldly, but aim your fire where it builds rather than burns.",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    image: "/planets/jupiter.png",
    rules: "Sagittarius · 9th House",
    keywords: ["Growth", "Wisdom", "Luck", "Expansion"],
    summary:
      "Jupiter expands horizons through wisdom, faith, and opportunity. It blesses learning, travel, and generosity. Invite Jupiter by saying yes to growth — study, explore, and share abundance freely.",
  },
  {
    id: "saturn",
    name: "Saturn",
    image: "/planets/saturn.png",
    rules: "Capricorn · 10th House",
    keywords: ["Discipline", "Structure", "Karma", "Mastery"],
    summary:
      "Saturn is the teacher of time, responsibility, and lasting structure. It asks for patience and integrity. Work with Saturn through discipline — what you build carefully endures, and mastery rewards commitment.",
  },
  {
    id: "uranus",
    name: "Uranus",
    image: "/planets/uranus.png",
    rules: "Aquarius · 11th House",
    keywords: ["Freedom", "Innovation", "Awakening", "Change"],
    summary:
      "Uranus awakens sudden insight, freedom, and radical change. It breaks patterns so truth can emerge. Welcome Uranus by staying open to the unexpected — innovation thrives where you dare to be different.",
  },
  {
    id: "neptune",
    name: "Neptune",
    image: "/planets/neptune.png",
    rules: "Pisces · 12th House",
    keywords: ["Dreams", "Intuition", "Compassion", "Illusion"],
    summary:
      "Neptune dissolves boundaries through dreams, intuition, and compassion. It inspires art and spiritual longing — and can cloud reality. Ground Neptune’s vision with clarity so inspiration becomes healing, not escape.",
  },
  {
    id: "pluto",
    name: "Pluto",
    image: "/planets/pluto.png",
    rules: "Scorpio · 8th House",
    keywords: ["Transformation", "Power", "Rebirth", "Depth"],
    summary:
      "Pluto transforms through depth, power, and rebirth. It reveals what must be released so new life can rise. Meet Pluto with courage — shadow work and honest endings clear the path to profound renewal.",
  },
];

export function getPlanetById(id: string | undefined): Planet | undefined {
  if (!id) return undefined;
  return PLANETS.find((p) => p.id === id.toLowerCase());
}
