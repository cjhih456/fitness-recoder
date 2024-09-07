import { PluginOption } from 'vite';
import configServer from './configServer'

interface options {
  path: string, modulePath: string[]
}

export default function GraphqlServer(options: options): PluginOption {
  return {
    name: 'GraphqlServer',
    apply: 'serve',
    configureServer(server) {
      return configServer(server, options.path, options.modulePath)
    }
  }
}