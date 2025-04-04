import graphqlConfig from '@fitness/eslint-config/graphql.js'
import tsconfig from '@fitness/eslint-config/ts.js'
import globals from 'globals'
const GLOBALS_BROWSER_FIX = globals.browser['AudioWorkletGlobalScope '] ? Object.assign({}, globals.browser, {
  AudioWorkletGlobalScope: globals.browser['AudioWorkletGlobalScope ']
}) : globals.browser;

delete GLOBALS_BROWSER_FIX['AudioWorkletGlobalScope '];

export default [...tsconfig, ...graphqlConfig, {
  languageOptions: {
    globals: {
      ...GLOBALS_BROWSER_FIX,
      ...globals.serviceworker
    }
  },
  rules: {
    'no-dupe-class-members': 'off'
  }
}];