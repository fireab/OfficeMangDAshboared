// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files
import enTranslation from './locales/en/translation.json';
import amTranslation from './locales/am/translation.json';
import omTranslation from './locales/om/translation.json';

i18n
  .use(LanguageDetector) // Detects user language from the browser
  .use(initReactI18next)  // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: enTranslation },
      am: { translation: amTranslation },
      or: { translation: omTranslation },
    },
    fallbackLng: 'or',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
