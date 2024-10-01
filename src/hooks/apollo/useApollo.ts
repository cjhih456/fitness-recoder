import { ApolloClient, InMemoryCache } from '@apollo/client'
import { link } from './HttpLink'

export const useApollo = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
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
}