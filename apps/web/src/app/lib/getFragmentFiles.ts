import type { DocumentNode } from '@apollo/client'
import { isDocumentNode } from '@apollo/client/utilities'

export const getFragmentFiles = () => {
  const fragmentFiles = import.meta.glob(['../../entities/**/*ragment.ts'], { eager: true })
  const fragmentList: DocumentNode[] = []
  for (const key in fragmentFiles) {
    const fragment = fragmentFiles[key] as Record<string, any>
    if (isDocumentNode(fragment?.default)) {
      fragmentList.push(fragment.default)
    }
  }
  return fragmentList
}