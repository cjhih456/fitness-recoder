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
          getScheduleByDate: offsetLimitPagination(['year', 'month', 'date'])
        }
      }
    }
  })
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
}