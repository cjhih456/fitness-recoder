import { PluginOption } from 'vite';
import { resolve } from 'path';
import * as fs from 'fs';
import xlsx from 'xlsx'
import _ from 'lodash'

interface options {
  fileName?: string
  outputPath?: string
}
xlsx.set_fs(fs)

interface Row {
  namespace: string
  code: string
  [k: string]: string
}

export default function LanguagePackExporter(options: options): PluginOption {
  let fileName: string | undefined = undefined
  const makeJsonFiles = (name: string) => {
    const xlsxFile = xlsx.readFile(name, { type: 'file' })
    const sheet = xlsxFile.Sheets[xlsxFile.SheetNames[0]]
    const languages = ['en', 'ko']
    const langObj: { [k: string]: any } = {}
    for (const row of xlsx.utils.sheet_to_json<Row>(sheet)) {
      languages.forEach(l => {
        _.set(langObj, [l, row.namespace, row.code.split('.')].flat(), row[l])
      })
    }

    for (const lang of Object.keys(langObj)) {
      for (const ns of Object.keys(langObj[lang])) {
        if (options.outputPath) {
          const path = resolve(__dirname, '../..', options.outputPath, lang)
          if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true })
          fs.writeFileSync(resolve(path, `${ns}.json`), JSON.stringify(langObj[lang][ns]))
        }
      }
    }
    const nsList = Object.keys(langObj[languages[0]])
    const declareModule = `${nsList.map(ns => `import type ${ns} from './${languages[0]}/${ns}.json'`).join('\n')}
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      ${nsList.map(ns => `${ns}: typeof ${ns}`).join('\n      ')};
    };
  }
}`
    if (options.outputPath) {
      fs.writeFileSync(resolve(__dirname, '../..', options.outputPath, 'i18n.d.ts'), declareModule)
    }
  }
  return {
    name: 'LanguagePackExporter',
    buildStart() {
      if (options.fileName) {
        fileName = resolve(__dirname, '../..', options.fileName)
      }
      if (fileName) {
        this.addWatchFile(fileName)
        const watchingFiles = this.getWatchFiles()
        if (!watchingFiles.includes(fileName)) {
          this.addWatchFile(fileName)
        }
        makeJsonFiles(fileName)
      }
    },
    handleHotUpdate(...ctx) {
      if (ctx[0].file === fileName && fileName) {
        makeJsonFiles(fileName)
      }
    }
  }
}
