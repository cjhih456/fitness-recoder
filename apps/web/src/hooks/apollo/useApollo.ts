import { ApolloClient, InMemoryCache } from '@apollo/client'
import { link } from './HttpLink'

export const useApollo = () => {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getFitnessListByKeywords: {
            keyArgs: ['name', 'category', 'muscle'],
            merge(existing = [], incoming) {
              return [...existing, ...incoming]
            }
          }
        }
      }
    }
  })
  return new ApolloClient({
    cache: cache,
    link: link,
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'ignore',
      },
      query: {
        errorPolicy: 'all',
      },
    },
    devtools: {
      enabled: true
    }
  })
}