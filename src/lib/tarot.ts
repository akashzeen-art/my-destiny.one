export interface TarotCard {
  id: string;
  name: string;
  image?: string;
  meaning: string;
}

/** Major Arcana readings — Cosmic Astro style copy. */
export const TAROT_DECK: TarotCard[] = [
  {
    id: "the-fool",
    name: "The Fool",
    meaning:
      "The Fool appears when a new journey is beginning. Trust the leap even when the path is unclear. This card invites curiosity, innocence, and the courage to start without needing every answer. Stay open — adventure favors the brave.",
  },
  {
    id: "the-magician",
    name: "The Magician",
    meaning:
      "The Magician reminds you that you already hold the tools you need. Focus your will, align intention with action, and channel your gifts into form. Manifestation is strongest when mind, heart, and hands work as one.",
  },
  {
    id: "the-high-priestess",
    name: "The High Priestess",
    meaning:
      "The High Priestess asks you to listen inward. Not everything must be spoken or forced. Secrets, intuition, and quiet knowing are guiding you now. Protect your stillness and trust what rises from the silence.",
  },
  {
    id: "the-empress",
    name: "The Empress",
    meaning:
      "The Empress brings abundance, creativity, and nurturing energy. Care for yourself and what you create. Beauty, comfort, and growth surround you when you honor the fertile ground of your life.",
  },
  {
    id: "the-emperor",
    name: "The Emperor",
    meaning:
      "The Emperor calls for structure, leadership, and steady authority. Build foundations that last. Boundaries protect what matters — lead with clarity rather than force, and order will follow.",
  },
  {
    id: "the-hierophant",
    name: "The Hierophant",
    meaning:
      "The Hierophant speaks of tradition, teaching, and sacred guidance. Seek wisdom from mentors or time-tested paths. Spiritual commitment and shared values can illuminate your next step.",
  },
  {
    id: "the-lovers",
    name: "The Lovers",
    meaning:
      "The Lovers highlight alignment of heart and choice. Love, partnership, or a meaningful decision is before you. Choose with integrity — when values match, connection deepens naturally.",
  },
  {
    id: "the-chariot",
    name: "The Chariot",
    meaning:
      "The Chariot urges forward motion through focused will. Victory comes when opposing forces are steered with discipline. Stay determined — progress favors those who keep their direction clear.",
  },
  {
    id: "strength",
    name: "Strength",
    meaning:
      "Strength is not brute force — it is gentle courage. Patience, compassion, and inner resolve tame what once felt wild. Soft power will carry you farther than aggression now.",
  },
  {
    id: "the-hermit",
    name: "The Hermit",
    meaning:
      "The Hermit invites solitude and inner light. Step back from noise to find your own truth. Wisdom grows in quiet reflection — trust the lantern you carry within.",
  },
  {
    id: "wheel-of-fortune",
    name: "Wheel of Fortune",
    meaning:
      "The Wheel turns — cycles shift, luck moves, and fate opens a new chapter. Embrace change rather than resist it. What rises now may be the turning point you have been waiting for.",
  },
  {
    id: "justice",
    name: "Justice",
    meaning:
      "Justice weighs truth and consequence. Fairness, accountability, and clear decisions are required. Act with honesty — balance returns when you face reality without illusion.",
  },
  {
    id: "the-hanged-man",
    name: "Hanged Man",
    image: "/tarot/hanged_man.png",
    meaning:
      "At first glance The Hanged Man may seem like a bad sign, but what’s interesting about him is his comfort with the situation he’s in. In traditional tarot, The Hanged Man is seen hanging upside down with his hands behind his back and a halo around his head, much like how saints were depicted in art from the middle ages. His expression is not one of sadness or anger, but of contentment. His hands behind his back are symbolic of his ability to manipulate the situation he’s in. After all, The Hanged Man has accepted that he’s brought it upon himself to be strung up in a tree. When this card shows up in your reading, it’s important to know if he is signifying you or someone else in your life. If he is meant to represent you personally, he is telling you that surrender may be your best option. When he is representing someone in your life, The Hanged Man is a sign that this person is not who they appear to be and could very well cause a big disruption in your life.",
  },
  {
    id: "death",
    name: "Death",
    meaning:
      "Death marks transformation, not literal endings alone. Something must be released so new life can begin. Let go gracefully — rebirth waits on the other side of what you outgrow.",
  },
  {
    id: "temperance",
    name: "Temperance",
    meaning:
      "Temperance blends opposites into harmony. Patience, moderation, and alchemy of spirit are favored. Mix carefully — balance creates lasting peace and healing.",
  },
  {
    id: "the-devil",
    name: "The Devil",
    meaning:
      "The Devil reveals attachment, temptation, or patterns that bind. Awareness is freedom’s first key. Name what holds you — then choose liberation over illusion.",
  },
  {
    id: "the-tower",
    name: "The Tower",
    meaning:
      "The Tower brings sudden revelation or upheaval. Structures built on false ground may fall. Though startling, this clearing makes space for truth and stronger rebuilding.",
  },
  {
    id: "the-star",
    name: "The Star",
    meaning:
      "The Star pours hope, healing, and quiet inspiration after hardship. Renew your faith. Guidance from above and within shines gently — follow that light.",
  },
  {
    id: "the-moon",
    name: "The Moon",
    meaning:
      "The Moon stirs dreams, intuition, and uncertainty. Not all is as it seems. Move carefully through mist — trust instinct, but verify illusions before you act.",
  },
  {
    id: "the-sun",
    name: "The Sun",
    meaning:
      "The Sun brings clarity, vitality, and joyful success. Warmth returns. Celebrate what thrives — confidence and radiance open doors that once felt closed.",
  },
  {
    id: "judgement",
    name: "Judgement",
    meaning:
      "Judgement calls for awakening and honest reckoning. Hear the call to rise anew. Forgiveness and purpose align when you answer from your higher self.",
  },
  {
    id: "the-world",
    name: "The World",
    meaning:
      "The World completes a cycle with fulfillment and wholeness. Integration and achievement are yours. Celebrate the journey — then prepare for the next sacred circle.",
  },
];

export function drawTarotCard(excludeId?: string): TarotCard {
  const pool = excludeId ? TAROT_DECK.filter((c) => c.id !== excludeId) : TAROT_DECK;
  return pool[Math.floor(Math.random() * pool.length)];
}
