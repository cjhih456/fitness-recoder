import { ApolloClient } from '@apollo/client'
import { link } from './HttpLink'
import useApolloCache from './useApolloCache'

export const useApollo = () => {
  const cache = useApolloCache()
  return cache.then((cache) => {
    return new ApolloClient({
      cache: cache,
      link: link,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all',
        },
      },
      devtools: {
        enabled: true
      }
    })
  })
}