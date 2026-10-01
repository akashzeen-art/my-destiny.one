export type ChineseAnimalId =
  | "rat"
  | "ox"
  | "tiger"
  | "rabbit"
  | "dragon"
  | "snake"
  | "horse"
  | "goat"
  | "monkey"
  | "rooster"
  | "dog"
  | "pig";

export interface ChineseZodiacSign {
  id: ChineseAnimalId;
  name: string;
  image: string;
  element: string;
  traits: string[];
  summary: string;
}

/** Display order matching Cosmic Astro reference grid. */
export const CHINESE_ZODIAC_SIGNS: ChineseZodiacSign[] = [
  {
    id: "monkey",
    name: "Monkey",
    image: "/chinese-horoscope/monkey.png",
    element: "Metal",
    traits: ["Clever", "Curious", "Witty", "Inventive"],
    summary:
      "The Monkey is clever, playful, and endlessly curious. You solve problems with wit and charm, thrive on variety, and inspire others with inventive ideas. Guard against restlessness — focus turns brilliance into lasting success.",
  },
  {
    id: "rooster",
    name: "Rooster",
    image: "/chinese-horoscope/rooster.png",
    element: "Metal",
    traits: ["Confident", "Honest", "Organized", "Observant"],
    summary:
      "The Rooster is bold, precise, and proud. You notice details others miss and speak with honesty. Structure and presentation matter to you. Soften criticism with kindness and your leadership shines brighter.",
  },
  {
    id: "dog",
    name: "Dog",
    image: "/chinese-horoscope/dog.png",
    element: "Earth",
    traits: ["Loyal", "Protective", "Honest", "Just"],
    summary:
      "The Dog is loyal, protective, and deeply fair. Friends and family trust your heart. You stand for justice and sincerity. Balance vigilance with rest — not every shadow is a threat.",
  },
  {
    id: "pig",
    name: "Pig",
    image: "/chinese-horoscope/pig.png",
    element: "Water",
    traits: ["Generous", "Sincere", "Diligent", "Compassionate"],
    summary:
      "The Pig is generous, sincere, and pleasure-loving in the best sense. You work hard and share freely. Abundance follows kindness. Stay discerning with trust so your open heart stays safe.",
  },
  {
    id: "rat",
    name: "Rat",
    image: "/chinese-horoscope/rat.png",
    element: "Water",
    traits: ["Intelligent", "Adaptable", "Ambitious", "Charming"],
    summary:
      "The Rat is quick-minded, adaptable, and resourceful. Opportunity finds you when you stay alert. Ambition serves you well — pair it with generosity so success feels shared, not solitary.",
  },
  {
    id: "ox",
    name: "Ox",
    image: "/chinese-horoscope/ox.png",
    element: "Earth",
    traits: ["Reliable", "Strong", "Patient", "Determined"],
    summary:
      "The Ox is steady, strong, and tirelessly determined. Slow progress is still progress — you build empires brick by brick. Allow flexibility sometimes; not every path needs to be plowed alone.",
  },
  {
    id: "tiger",
    name: "Tiger",
    image: "/chinese-horoscope/tiger.png",
    element: "Wood",
    traits: ["Brave", "Passionate", "Charismatic", "Independent"],
    summary:
      "The Tiger is courageous, magnetic, and fiercely independent. You leap toward challenge and inspire others to rise. Temper impulse with strategy — power guided by wisdom becomes legend.",
  },
  {
    id: "rabbit",
    name: "Rabbit",
    image: "/chinese-horoscope/rabbit.png",
    element: "Wood",
    traits: ["Gentle", "Elegant", "Diplomatic", "Intuitive"],
    summary:
      "The Rabbit is graceful, diplomatic, and quietly wise. Harmony and beauty surround your choices. Your intuition is a gift — trust soft strength; it outlasts force.",
  },
  {
    id: "dragon",
    name: "Dragon",
    image: "/chinese-horoscope/dragon.png",
    element: "Earth",
    traits: ["Powerful", "Visionary", "Confident", "Lucky"],
    summary:
      "The Dragon is visionary, powerful, and naturally fortunate. Big dreams suit you. Lead with heart as well as fire — humility turns awe into lasting respect.",
  },
  {
    id: "snake",
    name: "Snake",
    image: "/chinese-horoscope/snake.png",
    element: "Fire",
    traits: ["Wise", "Mysterious", "Elegant", "Strategic"],
    summary:
      "The Snake is wise, elegant, and deeply intuitive. You see patterns beneath the surface. Strategy and patience are your allies — share insight when the moment is ripe.",
  },
  {
    id: "horse",
    name: "Horse",
    image: "/chinese-horoscope/horse.png",
    element: "Fire",
    traits: ["Energetic", "Free-spirited", "Popular", "Hardworking"],
    summary:
      "The Horse is energetic, free-spirited, and hardworking. Movement and adventure fuel you. Freedom matters — choose commitments that still leave room to run.",
  },
  {
    id: "goat",
    name: "Goat",
    image: "/chinese-horoscope/goat.png",
    element: "Earth",
    traits: ["Creative", "Gentle", "Artistic", "Empathetic"],
    summary:
      "The Goat is creative, gentle, and artistically gifted. Empathy guides your world. Protect your peace and let imagination lead — beauty you create heals others too.",
  },
];

/** Standard cycle order starting with Rat (year 1900 / 2020). */
const CYCLE: ChineseAnimalId[] = [
  "rat",
  "ox",
  "tiger",
  "rabbit",
  "dragon",
  "snake",
  "horse",
  "goat",
  "monkey",
  "rooster",
  "dog",
  "pig",
];

export function getChineseSignByYear(year: number): ChineseZodiacSign {
  const idx = ((year - 1900) % 12 + 12) % 12;
  const id = CYCLE[idx];
  return CHINESE_ZODIAC_SIGNS.find((s) => s.id === id)!;
}

export function getChineseSignById(id: string | undefined): ChineseZodiacSign | undefined {
  if (!id) return undefined;
  return CHINESE_ZODIAC_SIGNS.find((s) => s.id === id.toLowerCase());
}

export const CHINESE_YEAR_OPTIONS = Array.from(
  { length: new Date().getFullYear() - 1925 },
  (_, i) => new Date().getFullYear() - i
);
