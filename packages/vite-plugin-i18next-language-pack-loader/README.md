# 🌐 Vite Plugin: i18next language pack export

## Install

### Package Manager
yarn
```
yarn add -D vite-plugin-i18next-language-pack-export
```

npm 
```
npm i -D vite-plugin-i18next-language-pack-export
```

### Plugin Options

| name | type | description | default |
| --- | --- | --- | --- |
| fileName | string | Excel file's path | '' |
| outputPath | string | Directory path for export json files & dts file. | '.' |
| useDts | boolean | If set true, export i18next.d.ts file. | false |
| defaultNS | string | Set default name space in i18n | 'translation' |
| langs | string[] | languages type | ['en'] |

### .env
```
VITE_I18NEXT_LANGS=["en","ko"]
```

### vite config file
```javascript
import LanguagePackExporter from 'vite-plugin-i18next-language-pack-loader'
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      LanguagePackExporter({
        fileName: './LanguagePack.xlsx',
        outputPath: './src/i18n',
        defaultNS: 'common',
        langs: JSON.parse(env.VITE_I18NEXT_LANGS)
      }),
    ]
  }
})
```
### i18n file
```javascript
const i18nFiles = import.meta.glob<Record<string, string>>('./(en|{langs...})/*{ns}.json', {
  import: 'default',
  eager: true // if you want lazy load, set as false 
})
```

## Excel format
| namespace | code | en | {lang...} | 
| --- | --- | --- | --- |
| ns1 | confirm1.ok | OK | translated msg1 |
| ns1 | confirm1.cancel | CANCEL | translated msg2 |
| ns1 | alert1 | Alert!! | translated msg3 |
| [empty row] |
| ns2 | welcome | Welcome | translated msg4 |





