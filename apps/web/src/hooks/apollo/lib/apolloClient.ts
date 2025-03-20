import { ApolloClient } from '@apollo/client'
import { link } from '../HttpLink'
import apolloCache from './apolloCache'

export default new ApolloClient({
  cache: apolloCache,
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
