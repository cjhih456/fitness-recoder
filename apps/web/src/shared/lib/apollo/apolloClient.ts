import type { DocumentNode } from '@apollo/client';
import { ApolloClient } from '@apollo/client'
import { link } from '@shared/lib/apollo/HttpLink'
import getApolloCache from './apolloCache'

export default function getApolloClient({
  fragmentList = []
}: {
  fragmentList?: DocumentNode[]
}) {
  return new ApolloClient({
    cache: getApolloCache({ fragmentList }),
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

} 