import * as fs from 'fs';
import { resolve } from 'path';
import { PluginOption } from 'vite'
import type { Manifest } from 'webextension-polyfill';
import pkg from '../../package.json';

const outDir = resolve(__dirname, '..', '..', 'public');

export default function makeManifest(env: any): PluginOption {
  return {
    name: 'make-manifest',
    buildEnd() {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }
      const manifestPath = resolve(outDir, 'manifest.webmanifest');
      const url = env.DEV ? new URL('/src/worker/GraphqlApi.ts', import.meta.url).href : (env.VITE_URL_ROOT + '/graphqlWorker.ts').replace('//', '/')

      const manifest: Manifest.WebExtensionManifest = {
        manifest_version: 3,
        name: pkg.displayName,
        short_name: pkg.displayName,
        version: pkg.version,
        description: pkg.description,
        author: pkg.author.name,
        background: {
          service_worker: url.replace('file://', ''),
          type: 'module',
        },
        content_security_policy: {
          extension_pages: 'script-src \'self\' \'wasm-unsafe-eval\'',
        }
      };
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    }
  }
}