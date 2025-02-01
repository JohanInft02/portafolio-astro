import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"
import resourcesToBackend from "i18next-resources-to-backend"

import enTranslations from "./locales/en.json"
import esTranslations from "./locales/es.json"

interface Resources {
  [key: string]: {
    translation: typeof enTranslations
  }
}

const resources: Resources = {
  en: { translation: enTranslations },
  es: { translation: esTranslations },
}

const i18n = i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      return Promise.resolve(resources[language]?.[namespace] || {})
    }),
  )

i18n.init({
  fallbackLng: "es",
  supportedLngs: ["en", "es"],
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
    caches: ["localStorage", "cookie"],
  },
})

export default i18n

export function useAstroI18next() {
  return {
    t: (key: string, options?: any) => i18n.t(key, options),
    i18n: i18n,
  }
}

export function getCurrentLanguage(): string {
  return i18n.language || "en"
}

