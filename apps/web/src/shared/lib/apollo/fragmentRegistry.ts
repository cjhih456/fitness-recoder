import { createFragmentRegistry } from '@apollo/client/cache';
import { isDocumentNode } from '@apollo/client/utilities';

const fragmentFiles = import.meta.glob(['../../../entities/**/*ragment.ts'], { eager: true })
const fragmentRegistry = createFragmentRegistry()

for (const key in fragmentFiles) {
  const fragment = fragmentFiles[key] as Record<string, any>
  if (isDocumentNode(fragment?.default)) {
    fragmentRegistry.register(fragment.default)
    console.log(key)
  }
}

export default fragmentRegistry