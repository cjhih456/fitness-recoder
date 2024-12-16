import type { PluginOption } from 'vite';
import type { WebAppManifest } from 'web-app-manifest';
import * as fs from 'fs';
import { resolve } from 'path';
import pkg from '../../package.json';

const outDir = resolve(__dirname, '..', '..', 'public');

export default function makeManifest(): PluginOption {
  return {
    name: 'make-manifest',
    buildStart() {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }
      const manifestPath = resolve(outDir, 'manifest.webmanifest');

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