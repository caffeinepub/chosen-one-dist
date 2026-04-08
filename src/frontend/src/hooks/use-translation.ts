import { useAppStore } from "../store";
import { TRANSLATIONS, type TranslationKey } from "../types";

export function useTranslation() {
  const language = useAppStore((s) => s.language);
  const translations = TRANSLATIONS[language];

  function t(key: TranslationKey): string {
    return translations[key] ?? TRANSLATIONS.en[key] ?? key;
  }

  return { t, language };
}
