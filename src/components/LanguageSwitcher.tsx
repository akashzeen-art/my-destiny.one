import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import type { Language } from "@/i18n";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <div className="relative inline-flex items-center">
      <Globe className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-amber-300 z-10" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="h-9 appearance-none rounded-lg border border-orange-500/30 bg-orange-500/10 pl-7 pr-6 text-xs font-medium text-amber-300 transition-all duration-200 hover:bg-orange-500/20 hover:text-amber-100 cursor-pointer focus:outline-none"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code} className="bg-[#1F2628] text-white">
            {l.flag} {l.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 text-amber-300 text-[10px]">▾</span>
    </div>
  );
};

export default LanguageSwitcher;
