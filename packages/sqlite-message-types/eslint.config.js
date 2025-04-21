import importConfig from "@fitness/eslint-config/import.js";  
import tsconfig from "@fitness/eslint-config/ts.js";

export default [
  ...tsconfig,
  ...importConfig,
  {
    rules: {
      "no-unused-vars": "off",
    },
  },
];
