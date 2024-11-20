import * as GraphqlEslint from "@graphql-eslint/eslint-plugin";

export default [{
  plugins: {
    "@graphql-eslint": GraphqlEslint
  },
  languageOptions: {
    parser: {
      parseForESLint: GraphqlEslint.parseForESLint
    }
  },
  files: ['**/*.gql']
}]