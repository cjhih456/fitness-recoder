import tsconfig from "@fitness/eslint-config/ts.js";

export default [
  ...tsconfig,
  {
    rules: {
      "no-unused-vars": "off",
    },
  },
];
