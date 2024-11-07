import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
  }
}

const i18nFiles = import.meta.glob('./(ko|en)/*.json', {
  import: 'default'
})

i18n.use(initReactI18next).init({
  defaultNS: 'common',
  debug: import.meta.env.DEV,
  ns: 'common',
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  saveMissing: true,
  updateMissing: true,
  react: {
    useSuspense: true,
    bindI18nStore: 'added'
  },
  async missingKeyHandler(lngs: readonly string[], ns: string) {
    for (const lng of lngs) {
      if (!i18n.hasResourceBundle(lng, ns)) {
        if (typeof i18nFiles[`./${lng}/${ns}.json`] === 'function') {
          const obj = await i18nFiles[`./${lng}/${ns}.json`]()
          i18n.addResourceBundle(lng, ns, obj, true, true)
        }
      }
    }
  },
}, () => { })


export default i18n