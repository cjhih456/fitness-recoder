import type { Manifest } from 'webextension-polyfill';
import pkg from '../package.json';

const url = new URL('/src/worker/GraphqlApi.worker.ts', import.meta.url).href

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

export default manifest;