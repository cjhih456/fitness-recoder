import * as fs from 'fs';
import { resolve } from 'path';
import { PluginOption } from 'vite'
import pkg from '../../package.json';
import { WebAppManifest } from 'web-app-manifest';

const outDir = resolve(__dirname, '..', '..', 'public');

export default function makeManifest(mode: string): PluginOption {
  return {
    name: 'make-manifest',
    buildStart() {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }
      const manifestPath = resolve(outDir, 'manifest.webmanifest');

      const url = new URL('@fitness/graphql-worker', import.meta.url).href

      const manifest: WebAppManifest = {
        name: pkg.displayName,
        short_name: pkg.displayName,
        description: pkg.description,
        display: 'minimal-ui',
        orientation: 'portrait',
        start_url: '/',
        categories: ['fitness', 'health'],
        icons: []
      };
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    }
  }
}