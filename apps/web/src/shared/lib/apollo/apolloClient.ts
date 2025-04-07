import { ApolloClient } from '@apollo/client'
import { link } from '@shared/lib/apollo/HttpLink'
import apolloCache from './apolloCache'

export default new ApolloClient({
  cache: apolloCache,
  link: link,
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
  devtools: {
    enabled: true
  }
})
