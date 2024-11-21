import i18n, { CustomTypeOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';


const i18nFiles: Record<string, () => Promise<Record<string, string>>> = import.meta.glob<Record<string, string>>('./(ko|en)/*.json', {
  import: 'default'
})

// @ts-ignore
type ResourceKey = keyof CustomTypeOptions['resources']

async function loadNamespace(lng: string, ns: ResourceKey): Promise<void> {
  const key = `./${lng}/${String(ns)}.json`
  if (typeof i18nFiles[key] === 'function') {
    const translations = await i18nFiles[key]()
    i18n.addResourceBundle(lng, String(ns), translations, true, true)
  }
}

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
        await loadNamespace(lng, ns as ResourceKey)
      }
    }
  },
}, () => { })


export default i18n