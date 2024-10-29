import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const i18nFiles = import.meta.glob('./(ko|en)/*.json', {
  import: 'default'
})

i18n.use(initReactI18next).init({
  resources: {
  },
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: 'common',
  interpolation: {
    escapeValue: false
  },
  fallbackNS: [],
  saveMissing: true,
  updateMissing: true,
  async missingKeyHandler(lngs, ns) {
    for (const lng of lngs) {
      if (!i18n.hasResourceBundle(lng, ns)) {
        if (i18nFiles[`./${lng}/${ns}.json`]) {
          i18n.addResourceBundle(lng, ns, (await i18nFiles[`./${lng}/${ns}.json`]()), true, true)
        }
      }
    }
  },
})


export default i18n