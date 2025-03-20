# Vite Apollo Server Plugin


## <span style="color:red">This Server is a mock server. So, cannot response by request.</span>


### Options
```ts
{
  path: string, // Graphql server's url path
  modulePath: string[] // Graphql Server Graphql path
  autoGenTypePath?: string // PossibleType.json export path
}
```

### vite config file
```ts
import GraphqlServer from '@fitness/vite-plugin-graphql-server'
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    server: mode === 'development' ? {
      headers: {
        // Cross-Origin-Resource-Policy setting are need, When display Apollo Server Sandbox
        'Cross-Origin-Resource-Policy': 'cross-origin',
      }
    } : undefined
    plugins: [
      GraphqlServer({
        modulePath: [
          '../../packages/graphql-worker/src/graphql/Schedule/query.gql',
          '../../packages/graphql-worker/src/graphql/Sets/query.gql',
          '../../packages/graphql-worker/src/graphql/Exercise/query.gql',
          '../../packages/graphql-worker/src/graphql/ExercisePreset/query.gql'
        ],
        path: '/__graphql',
        autoGenTypePath: './src/hooks/apollo/possibleTypes.json'
      })
    ]
  }
})
```

### Set PossibleType to ApolloClient cache
```javascript
// @ts-ignore: Unreachable code error. will be auto generate
import PossibleTypes from './possibleTypes.json'
export const useApollo = async () => {
  const cache = new InMemoryCache({
    possibleTypes: PossibleTypes,
  })
  return new ApolloClient({
    cache: cache,
  })
}
```