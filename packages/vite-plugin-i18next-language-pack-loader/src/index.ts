import { Plugin } from 'vite';
import { resolve } from 'path';
import * as fs from 'fs';
import xlsx from 'xlsx'
import _ from 'lodash'
import { Resource } from 'i18next'

export interface Options {
  /**
   * Excel file's path
   */
  fileName: string
  /**
   * directory path for export json files & dts file.
   */
  outputPath: string
  /** 
   * Set default name space in i18n
   * default value: translation
   */
  defaultNS: string
  /**
   * export i18next.d.ts file
   * default value: false
   */
  useDts: boolean
  /**
   * languages type
   */
  langs: string[]
}

interface Row {
  namespace: string
  code: string
  [k: string]: string
}

type LangObj = Record<string, Record<string, string>>

/**
 * Make language object. that filtered by langs. If not include into langs, text will be ignore.
 * @param fileName Excel file name
 * @param langs language filter
 * @returns 
 */
function loadLangObj(fileName: string, langs: string[]) {
  const xlsxFile = xlsx.readFile(fileName, { type: 'file' })
  const sheet = xlsxFile.Sheets[xlsxFile.SheetNames[0]]
  const langObj: LangObj = {}
  for (const row of xlsx.utils.sheet_to_json<Row>(sheet)) {
    langs.forEach(l => {
      _.set(langObj, [l, row.namespace, row.code.split('.')].flat(), row[l])
    })
  }
  return langObj
}

/**
 * make JSON files by {lang}/{ns}.
 * @param langObj result value of loadLangObj function
 * @param outputPath save directory path {option.outputPath}
 */
function makeJsonFiles(langObj: LangObj, outputPath: string) {
  for (const lang of Object.keys(langObj)) {
    for (const ns of Object.keys(langObj[lang])) {
      const path = resolve(outputPath, lang)
      if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true })
      fs.writeFileSync(resolve(path, `${ns}.json`), JSON.stringify(langObj[lang][ns]))
    }
  }
}
/**
 * Make ts define file.
 * @param langObj result value of loadLangObj function
 * @param defaultNS default namespace {option.defaultNS}
 * @param outputPath save directory path {option.outputPath}
 */
function makeDtsString(langObj: LangObj, defaultNS: string, outputPath: string) {
  const lang = Object.keys(langObj)[0]
  const nsList = Object.keys(langObj[lang])

  let outStr = ''
  outStr += nsList.map(ns => `import type ${ns} from './${lang}/${ns}.json'`).join('\n') + '\n'
  outStr += `declare module 'i18next' {\n`
  outStr += `  interface CustomTypeOptions {\n`
  outStr += `    defaultNS: '${defaultNS}';\n`
  outStr += `    resources: {\n`
  outStr += `      ${nsList.map(ns => `${ns}: typeof ${ns};`).join('\n      ')}\n`
  outStr += `    };\n`
  outStr += `  }\n`
  outStr += `}\n`
  if (outputPath) {
    fs.writeFileSync(resolve(outputPath, 'i18next.d.ts'), outStr)
  }
}

export default function LanguagePackExporter(options: Partial<Options>): Plugin {
  const defaultOptions: Options = {
    fileName: options.fileName ?? '',
    outputPath: options.outputPath ?? '.',
    useDts: options.useDts ?? false,
    defaultNS: options.defaultNS ?? 'translation',
    langs: options.langs ?? ['en']
  }
  let fileName: string | undefined = undefined
  let langObj: Resource = {}
  xlsx.set_fs(fs)
  const factor: Plugin = {
    name: 'LanguagePackExporter',
    enforce: 'pre',
    buildStart() {
      if (defaultOptions.fileName) {
        fileName = resolve(defaultOptions.fileName)
      }
      if (fileName) {
        this.addWatchFile(fileName)
        const watchingFiles = this.getWatchFiles()
        if (!watchingFiles.includes(fileName)) {
          this.addWatchFile(fileName)
        }
        const langObj = loadLangObj(fileName, defaultOptions.langs)
        makeJsonFiles(langObj, defaultOptions.outputPath)
        defaultOptions.useDts && makeDtsString(langObj, defaultOptions.defaultNS, defaultOptions.outputPath)
      }
    },
    handleHotUpdate(...ctx) {
      if (fileName && ctx[0].file === fileName) {
        const langObj = loadLangObj(fileName, defaultOptions.langs)
        makeJsonFiles(langObj, defaultOptions.outputPath)
        defaultOptions.useDts && makeDtsString(langObj, defaultOptions.defaultNS, defaultOptions.outputPath)
      }
    }
  }
  return factor
}
