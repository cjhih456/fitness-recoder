import { createFragmentRegistry } from '@apollo/client/cache';
import { isDocumentNode } from '@apollo/client/utilities';

const fragmentFiles = import.meta.glob(['/src/entities/**/*ragment.ts'], { eager: true })
const fragmentRegistry = createFragmentRegistry()

for (const key in fragmentFiles) {
  const fragment = fragmentFiles[key] as Record<string, any>
  if (isDocumentNode(fragment?.default)) {
    fragmentRegistry.register(fragment.default)
  }
}

export default fragmentRegistry