import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enJson from "./locales/en/translation.json";
import jaJson from "./locales/ja/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: { translation: enJson },
      ja: { translation: jaJson },
    },
    detection: {
      caches: [],
    },
  });

export default i18n;
