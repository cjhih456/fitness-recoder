
import importPlugin from "eslint-plugin-import";

export default [
  // ESlint import list sort
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
]