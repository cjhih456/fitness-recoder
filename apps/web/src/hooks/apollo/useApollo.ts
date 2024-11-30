import { ApolloClient, InMemoryCache } from '@apollo/client'
import { link } from './HttpLink'
import { offsetLimitPagination } from '@apollo/client/utilities'

export const useApollo = () => {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getExercisePresetList: offsetLimitPagination(),
          getFitnessListByKeywords: offsetLimitPagination(['name', 'category', 'muscle']),
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