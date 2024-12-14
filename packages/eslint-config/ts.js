import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import js from "@eslint/js";
import path from "path";

export default [
  {
    ignores: ["**/dist", "**/.eslintrc.cjs"],
  },
  js.configs.recommended,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        tsconfigRootDir: path.resolve(),
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      quotes: ["error", "single"],
      "no-extra-parens": "error",
      "no-unexpected-multiline": "error",
      "array-bracket-spacing": ["error", "never"],
      "block-spacing": ["error", "always"],
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "comma-spacing": ["error", { before: false, after: true }],
      "func-call-spacing": ["error", "never"],
      "key-spacing": [
        "error",
        {
          beforeColon: false,
          afterColon: true,
          mode: "strict",
        },
      ],
      "keyword-spacing": [
        "error",
        {
          before: true,
          after: true,
        },
      ],
      "lines-between-class-members": ["error", "always"],
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
          maxEOF: 0,
          maxBOF: 0,
        },
      ],
      "object-curly-spacing": ["error", "always"],
      "padding-line-between-statements": [
        "error",
        { blankLine: "never", prev: "import", next: "import" },
      ],
      "space-before-blocks": ["error", "always"],
      "space-in-parens": ["error", "never"],
      "space-infix-ops": "error",
      indent: [
        "error",
        2,
        {
          SwitchCase: 1,
        },
      ],
      // "no-undef": "off",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  importPlugin.flatConfigs.recommended,
  {
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/order": [
        "error",
        {
          groups: [
            "type",
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "unknown",
          ],
          alphabetize: {
            order: "asc",
          },
        },
      ],
    },
  },
];
