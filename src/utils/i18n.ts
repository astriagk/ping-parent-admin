import translationEn from '@src/json/lang/en.json'
import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: { translation: translationEn },
}

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    // lng: localStorage.getItem("I18N_LANGUAGE") || "en",
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  })
export default i18n
