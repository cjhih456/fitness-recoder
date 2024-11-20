import tseslint from 'typescript-eslint'
import js from "@eslint/js";
import path from 'path'

export default [{
  ignores: ["**/dist", "**/.eslintrc.cjs"],
}, js.configs.recommended,
{
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      tsconfigRootDir: path.resolve()
    }
  },
  plugins: {
    'typescript-eslint': tseslint.plugin
  },
  files: ['**/*.ts', '**/*.tsx'],
  ignores: ["**/*.d.ts"],
  rules: {
    "typescript-eslint/ban-ts-comment": "off",
    "typescript-eslint/no-explicit-any": "off",
    quotes: ["error", "single"],
    indent: ["error", 2, {
      SwitchCase: 1,
    }],
    // "no-undef": "off",
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
  }
}];