import tsconfig from '@fitness/eslint-config/ts.js'
import graphqlConfig from '@fitness/eslint-config/graphql.js'
import ReactHook from 'eslint-plugin-react-hooks'
import ReactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
const GLOBALS_BROWSER_FIX = globals.browser['AudioWorkletGlobalScope '] ? Object.assign({}, globals.browser, {
  AudioWorkletGlobalScope: globals.browser['AudioWorkletGlobalScope ']
}) : globals.browser;

delete GLOBALS_BROWSER_FIX['AudioWorkletGlobalScope '];


export default [...tsconfig, ...graphqlConfig, {
  languageOptions: {
    globals: {
      ...GLOBALS_BROWSER_FIX,
      ...globals.node,
      ...globals.es2020
    }
  },
  plugins: {
    'react-refresh': {
      rules: ReactRefresh.rules
    },
    'react-hooks': {
      rules: ReactHook.rules
    }
  },
  rules: {
    ...ReactHook.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  }
}];

