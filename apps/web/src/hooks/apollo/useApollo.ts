import { ApolloClient, InMemoryCache } from '@apollo/client'
import { link } from './HttpLink'
import { offsetLimitPagination } from '@apollo/client/utilities'

const PossibleTypes = () => import.meta.glob<Record<string, string[]>>('./possibleTypes.json', {
  import: 'default'
})

export const useApollo = async () => {
  const PossibleTypesData = await Promise.all(Object.values((await PossibleTypes())).map(async (it) => {
    return await it()
  }))

  const cache = new InMemoryCache({
    possibleTypes: PossibleTypesData[0],
    typePolicies: {
      Query: {
        fields: {
          getScheduleStatusByDate: offsetLimitPagination(['year', 'month']),
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