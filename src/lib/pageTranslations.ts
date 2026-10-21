import { useLanguage } from "@/contexts/LanguageContext";

const PAGE_STRINGS = {
  en: {
    // Horoscope
    horoscope: { title: "Choose Your Zodiac Sign" },
    // Tarot
    tarot: {
      title: "Tarot", titleHighlight: "Card", titleSuffix: "Reading",
      open: "Open", drawAgain: "Draw again",
      askAstra: "Ask Astra to explain your Tarot reading",
    },
    // Numerology
    numerology: {
      title: "Birthday", titleHighlight: "numerology",
      selectBirthday: "Please select your birthday",
      day: "Day", month: "Month", year: "Year", submit: "Submit",
      orChoose: "Or choose a number",
      error: "Please select your full birthday.",
    },
    // Chinese Horoscope
    chinese: {
      title: "Chinese", titleHighlight: "horoscope",
      selectYear: "Please select your birthyear",
      year: "Year", submit: "Submit",
      orChoose: "Or choose your Chinese zodiac sign",
      error: "Please select your birth year.",
    },
    // Planets
    planets: { title: "Meaning of", titleHighlight: "Planets" },
    // About Astrology
    about: {
      title: "All", titleHighlight: "About", titleSuffix: "Astrology",
      sections: [
        {
          title: "What is Astrology?",
          text: `Astrology is the study of the relationship between the position of celestial bodies and events on Earth. Astrologers believe that understanding the impact between planets and the natural world can predict potential future events. Many cultures have practiced astrology for centuries and have created their own variations, including: Chinese, Vedas, Tibet, Western.\nWhat most people know about astrology is its "sign". It refers to one of the 12 constellations of the zodiac, which is a form of horoscope. This is the simplest form, as all you need to create a horoscope is a person's birthday.`,
        },
        {
          title: "Is astrology a science?",
          text: `Most people think of astrology as a pseudoscience, but it overlaps with both astronomy and psychology. Astrologers use astronomy to track the movement of planets and asteroids. You need to know where all the constellations are, how long it takes the planet to cross the sign, and most importantly, where all the celestial bodies are in the sky at that moment. Astrologers also often use mathematics to calculate the exact angle of a planet and determine its aspect. This information can be used by astrologers to analyze accordingly.`,
        },
        {
          title: "Can astrology predict the future?",
          text: `The answer to this question is complicated. Basically, astrology can be used to predict potential events. We call it "potential" because free will has as much impact on your personal life as the movement of the planet.\nFor example, let's say your horoscope warns you that a division is imminent. So you start working on your relationship, getting more communication, and you really never break up. Instead, your relationship is stronger than ever. What do you get? Your horoscope was not "wrong", it allowed you to change your destiny by simply taking advantage of what was not working. Astrology sheds light on what needs attention, but it is our responsibility to work and make positive changes.`,
        },
      ],
    },
    // Astrology Houses
    houses: {
      title: "All", titleHighlight: "About", titleSuffix: "Astrology Houses",
      aboutTitle: "About Houses",
      aboutP1: "The zodiac is divided into 12 segments called houses, and each of them is ruled by a different zodiac sign. Each house represents a key part of life, from health to money to relationships and everything in between. They all have a specific set of traits, beginning from the self, and expanding outward into society and beyond.",
      aboutP2: "You can view the 12 astrology houses as a clock. A clock is divided into 12 segments. Like a clock, the zodiac begins with the first house, and then goes counterclockwise around. The first six houses are known as the 'personal houses,' while the last six houses are known as the 'interpersonal houses.'",
      roadmapTitle: "Roadmap to the present",
      roadmapP1: "The houses are a roadmap for understanding your past, present, and future. When you're born, each planet was in a certain house. Those houses can be seen in your birth chart. Your birth chart is basically a snapshot of the sky at your moment of birth. Not only the day you were born but also the exact time.",
      roadmapP2: "All this information can give you valuable insights. Not just about your own personality, but also how you coexist with the world around you.",
      overviewLabel: "Overview of the houses and by whom it is ruled",
      houses: [
        { house: "1st house", theme: "Self-Image", ruler: "Aries" },
        { house: "2nd house", theme: "Self-Worth and Money", ruler: "Taurus" },
        { house: "3rd house", theme: "Communication", ruler: "Gemini" },
        { house: "4th house", theme: "Family, Home, Roots, Security", ruler: "Cancer" },
        { house: "5th house", theme: "Self-Expression, Creativity, Pleasure, Romance", ruler: "Leo" },
        { house: "6th house", theme: "Work, Health", ruler: "Virgo" },
        { house: "7th house", theme: "Partnership, Marriage", ruler: "Libra" },
        { house: "8th house", theme: "Transformation, Sexuality", ruler: "Scorpio" },
        { house: "9th house", theme: "Belief Systems, Higher Learning", ruler: "Sagittarius" },
        { house: "10th house", theme: "Profession, Responsibility, Reputation", ruler: "Capricorn" },
        { house: "11th house", theme: "Aspirations, Personal Goals, Groups", ruler: "Aquarius" },
        { house: "12th house", theme: "Soul Growth, Privacy, Secrets", ruler: "Pisces" },
      ],
    },
    // Talk to Astra
    astra: {
      title: "Talk to", titleHighlight: "Astra",
      subtitle: "Ask by text or voice — Astra answers and can speak aloud.",
      voiceOn: "Voice on", voiceOff: "Voice off", stop: "Stop",
      speaking: "Speaking…", playVoice: "Play voice",
      listening: "Astra is listening…",
      recording: "Recording… tap mic again to send",
      transcribing: "Transcribing your voice…",
      placeholder: "What would you like to know?",
      send: "Send",
      greeting: "Hello Wanderer — I'm Astra. Ask me about your stars, dreams, tarot, numbers, or anything under the cosmos. You can type or tap the mic to speak.",
    },
    // Dream Interpretation
    dreams: {
      title: "Dream", titleHighlight: "Interpretation",
      subtitle: "Type or speak your dream — Astra will read it aloud with you.",
      yourDream: "Your dream",
      stop: "Stop", transcribing: "Transcribing…", speakDream: "Speak dream",
      placeholder: "I was walking through a dark forest when a silver moon rose...",
      interpret: "Interpret with Astra", interpreting: "Reading the dream…",
      playVoice: "Play voice",
      errorShort: "Describe your dream in a little more detail (at least a few sentences).",
    },
    // Footer
    footer: { copyright: "Copyright © 2026 All rights reserved" },
  },

  es: {
    horoscope: { title: "Elige Tu Signo del Zodíaco" },
    tarot: {
      title: "Lectura de", titleHighlight: "Cartas", titleSuffix: "del Tarot",
      open: "Abrir", drawAgain: "Sacar otra carta",
      askAstra: "Pídele a Astra que explique tu lectura de Tarot",
    },
    numerology: {
      title: "Numerología", titleHighlight: "de Cumpleaños",
      selectBirthday: "Por favor selecciona tu fecha de nacimiento",
      day: "Día", month: "Mes", year: "Año", submit: "Enviar",
      orChoose: "O elige un número",
      error: "Por favor selecciona tu fecha de nacimiento completa.",
    },
    chinese: {
      title: "Horóscopo", titleHighlight: "Chino",
      selectYear: "Por favor selecciona tu año de nacimiento",
      year: "Año", submit: "Enviar",
      orChoose: "O elige tu signo del zodíaco chino",
      error: "Por favor selecciona tu año de nacimiento.",
    },
    planets: { title: "Significado de los", titleHighlight: "Planetas" },
    about: {
      title: "Todo", titleHighlight: "Sobre", titleSuffix: "la Astrología",
      sections: [
        {
          title: "¿Qué es la Astrología?",
          text: `La astrología es el estudio de la relación entre la posición de los cuerpos celestes y los eventos en la Tierra. Los astrólogos creen que comprender el impacto entre los planetas y el mundo natural puede predecir eventos futuros potenciales. Muchas culturas han practicado la astrología durante siglos y han creado sus propias variaciones, incluyendo: China, Vedas, Tíbet, Occidental.\nLo que la mayoría de la gente sabe sobre astrología es su "signo". Se refiere a una de las 12 constelaciones del zodíaco, que es una forma de horóscopo. Esta es la forma más simple, ya que todo lo que necesitas para crear un horóscopo es el cumpleaños de una persona.`,
        },
        {
          title: "¿Es la astrología una ciencia?",
          text: `La mayoría de la gente piensa en la astrología como una pseudociencia, pero se superpone tanto con la astronomía como con la psicología. Los astrólogos usan la astronomía para rastrear el movimiento de planetas y asteroides. Necesitas saber dónde están todas las constelaciones, cuánto tiempo tarda el planeta en cruzar el signo y, lo más importante, dónde están todos los cuerpos celestes en el cielo en ese momento. Los astrólogos también suelen usar las matemáticas para calcular el ángulo exacto de un planeta y determinar su aspecto.`,
        },
        {
          title: "¿Puede la astrología predecir el futuro?",
          text: `La respuesta a esta pregunta es complicada. Básicamente, la astrología se puede usar para predecir eventos potenciales. Lo llamamos "potencial" porque el libre albedrío tiene tanto impacto en tu vida personal como el movimiento del planeta.\nPor ejemplo, digamos que tu horóscopo te advierte que una separación es inminente. Entonces comienzas a trabajar en tu relación, mejoras la comunicación y realmente nunca te separas. En cambio, tu relación es más fuerte que nunca. La astrología arroja luz sobre lo que necesita atención, pero es nuestra responsabilidad trabajar y hacer cambios positivos.`,
        },
      ],
    },
    houses: {
      title: "Todo", titleHighlight: "Sobre", titleSuffix: "las Casas Astrológicas",
      aboutTitle: "Sobre las Casas",
      aboutP1: "El zodíaco está dividido en 12 segmentos llamados casas, y cada uno de ellos está regido por un signo zodiacal diferente. Cada casa representa una parte clave de la vida, desde la salud hasta el dinero, las relaciones y todo lo demás. Todas tienen un conjunto específico de rasgos, comenzando desde el yo y expandiéndose hacia la sociedad y más allá.",
      aboutP2: "Puedes ver las 12 casas astrológicas como un reloj. Un reloj está dividido en 12 segmentos. Como un reloj, el zodíaco comienza con la primera casa y luego va en sentido antihorario. Las primeras seis casas se conocen como las 'casas personales', mientras que las últimas seis se conocen como las 'casas interpersonales'.",
      roadmapTitle: "Hoja de ruta al presente",
      roadmapP1: "Las casas son una hoja de ruta para comprender tu pasado, presente y futuro. Cuando naces, cada planeta estaba en una determinada casa. Esas casas se pueden ver en tu carta natal. Tu carta natal es básicamente una instantánea del cielo en el momento de tu nacimiento, no solo el día en que naciste sino también la hora exacta.",
      roadmapP2: "Toda esta información puede darte valiosas perspectivas. No solo sobre tu propia personalidad, sino también sobre cómo coexistes con el mundo que te rodea.",
      overviewLabel: "Descripción general de las casas y por quién están regidas",
      houses: [
        { house: "Casa 1", theme: "Autoimagen", ruler: "Aries" },
        { house: "Casa 2", theme: "Autoestima y Dinero", ruler: "Tauro" },
        { house: "Casa 3", theme: "Comunicación", ruler: "Géminis" },
        { house: "Casa 4", theme: "Familia, Hogar, Raíces, Seguridad", ruler: "Cáncer" },
        { house: "Casa 5", theme: "Autoexpresión, Creatividad, Placer, Romance", ruler: "Leo" },
        { house: "Casa 6", theme: "Trabajo, Salud", ruler: "Virgo" },
        { house: "Casa 7", theme: "Asociación, Matrimonio", ruler: "Libra" },
        { house: "Casa 8", theme: "Transformación, Sexualidad", ruler: "Escorpio" },
        { house: "Casa 9", theme: "Sistemas de Creencias, Educación Superior", ruler: "Sagitario" },
        { house: "Casa 10", theme: "Profesión, Responsabilidad, Reputación", ruler: "Capricornio" },
        { house: "Casa 11", theme: "Aspiraciones, Metas Personales, Grupos", ruler: "Acuario" },
        { house: "Casa 12", theme: "Crecimiento del Alma, Privacidad, Secretos", ruler: "Piscis" },
      ],
    },
    astra: {
      title: "Hablar con", titleHighlight: "Astra",
      subtitle: "Pregunta por texto o voz — Astra responde y puede hablar en voz alta.",
      voiceOn: "Voz activada", voiceOff: "Voz desactivada", stop: "Detener",
      speaking: "Hablando…", playVoice: "Reproducir voz",
      listening: "Astra está escuchando…",
      recording: "Grabando… toca el micrófono de nuevo para enviar",
      transcribing: "Transcribiendo tu voz…",
      placeholder: "¿Qué te gustaría saber?",
      send: "Enviar",
      greeting: "Hola Viajero — Soy Astra. Pregúntame sobre tus estrellas, sueños, tarot, números o cualquier cosa bajo el cosmos. Puedes escribir o tocar el micrófono para hablar.",
    },
    dreams: {
      title: "Interpretación", titleHighlight: "de Sueños",
      subtitle: "Escribe o habla tu sueño — Astra lo leerá en voz alta contigo.",
      yourDream: "Tu sueño",
      stop: "Detener", transcribing: "Transcribiendo…", speakDream: "Hablar sueño",
      placeholder: "Estaba caminando por un bosque oscuro cuando salió una luna plateada...",
      interpret: "Interpretar con Astra", interpreting: "Leyendo el sueño…",
      playVoice: "Reproducir voz",
      errorShort: "Describe tu sueño con un poco más de detalle (al menos unas pocas oraciones).",
    },
    footer: { copyright: "Copyright © 2026 Todos los derechos reservados" },
  },
} as const;

type Lang = keyof typeof PAGE_STRINGS;

export function usePageT() {
  const { language } = useLanguage();
  const lang: Lang = language === "es" ? "es" : "en";
  return PAGE_STRINGS[lang];
}
