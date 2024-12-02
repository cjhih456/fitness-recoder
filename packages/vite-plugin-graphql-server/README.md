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
const PossibleTypes = () => import.meta.glob<Record<string, string[]>>('./possibleTypes.json', {
  import: 'default'
})
export const useApollo = async () => {
  const PossibleTypesData = await Promise.all(Object.values((await PossibleTypes())).map(async (it) => {
    return await it()
  }))
  const cache = new InMemoryCache({
    possibleTypes: PossibleTypesData[0],
  })
  return new ApolloClient({
    cache: cache,
  })
}
```