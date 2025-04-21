import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import {flatConfigs as importFlatConfigs} from "eslint-plugin-import";
import fsdImportConfig from "@feature-sliced/eslint-config";
import graphqlConfig from "@fitness/eslint-config/graphql.js";
import customImportConfig from "@fitness/eslint-config/import.js";
import tsconfig from "@fitness/eslint-config/ts.js";
import ReactHook from "eslint-plugin-react-hooks";
import ReactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

const GLOBALS_BROWSER_FIX = globals.browser["AudioWorkletGlobalScope "]
  ? Object.assign({}, globals.browser, {
      AudioWorkletGlobalScope: globals.browser["AudioWorkletGlobalScope "],
    })
  : globals.browser;

delete GLOBALS_BROWSER_FIX["AudioWorkletGlobalScope "];

const compat = new FlatCompat({
	baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
});


export default [
  ...tsconfig,
  ...graphqlConfig,
  importFlatConfigs.recommended,
  ...compat.config({
    ...fsdImportConfig,
    extends: [
      fsdImportConfig.extends[1], // layers-slices
    ],
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    parserOptions: undefined,
    rules: customImportConfig[1].rules
  }),
  {
    languageOptions: {
      globals: {
        import: false,
        ...GLOBALS_BROWSER_FIX,
        ...globals.node,
        ...globals.es2020,
        RequestInfo: false,
        RequestInit: false,
      },
    },
    plugins: {
      "react-refresh": {
        rules: ReactRefresh.rules,
      },
      "react-hooks": {
        rules: ReactHook.rules,
      },
    },
    rules: {
      ...ReactHook.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
