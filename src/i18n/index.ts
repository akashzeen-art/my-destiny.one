import en from "./en";
import my from "./my";
import es from "./es";
import type { Language, Translations } from "./types";

export const translations: Record<Language, Translations> = { en, my, es };

export function t(lang: Language): Translations {
  return translations[lang] ?? translations.en;
}

export type { Language, Translations };
