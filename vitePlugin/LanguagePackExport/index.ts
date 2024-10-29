import { PluginOption } from 'vite';
import { resolve } from 'path';
import * as fs from 'fs';
import xlsx from 'xlsx'
import _ from 'lodash'

interface options {
  file?: File,
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
  return {
    name: 'LanguagePackExporter',
    buildStart() {
      let xlsxFile: xlsx.WorkBook | undefined = undefined
      if (options.fileName)
        xlsxFile = xlsx.readFile(resolve(options.fileName), { type: 'file' })
      else if (options.file)
        xlsxFile = xlsx.read(options.file)
      if (xlsxFile) {
        const sheet = xlsxFile.Sheets[xlsxFile.SheetNames[0]]
        const languages = ['ko', 'en']
        const langObj: { [k: string]: any } = {}
        for (const row of xlsx.utils.sheet_to_json<Row>(sheet)) {
          languages.forEach(l => {
            _.set(langObj, [l, row.namespace, row.code.split('.')].flat(), row[l])
          })
        }
        for (const lang of Object.keys(langObj)) {
          for (const ns of Object.keys(langObj[lang])) {
            if (options.outputPath) {
              fs.writeFileSync(resolve(options.outputPath, lang, `${ns}.json`), JSON.stringify(langObj[lang][ns]))
            }
          }
        }
      }
    }
  }
}
