import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createFragmentRegistry } from '@apollo/client/cache'
import { offsetLimitPagination } from '@apollo/client/utilities'
import { ExerciseFragment } from '@service/GqlStore/Exercise'
import { FitnessDetailFragment } from '@service/GqlStore/Fitness'
import { ScheduleSimpleFragment, ScheduleTimeFragment } from '@service/GqlStore/Schedule'
import { SetsFragment } from '@service/GqlStore/Set'
import { ExercisePresetFragment } from './Fragments/useExercisePresetFragment'
import { ExercisePresetWithListFragment } from './Fragments/useExercisePresetWithListFragment'
import { FitnessFragment } from './Fragments/useFitnessFragment'
import { FitnessSimpleFragment } from './Fragments/useFitnessSimpleFragment'
import { link } from './HttpLink'

const PossibleTypes = () => import.meta.glob<Record<string, string[]>>('./possibleTypes.json', {
  import: 'default'
})

export const useApollo = async () => {
  const PossibleTypesData = await Promise.all(Object.values(await PossibleTypes()).map(async (it) => {
    return await it()
  }))

  const cache = new InMemoryCache({
    possibleTypes: PossibleTypesData[0],
    fragments: createFragmentRegistry(
      SetsFragment,
      ScheduleTimeFragment,
      ScheduleSimpleFragment,
      FitnessSimpleFragment,
      FitnessDetailFragment,
      FitnessFragment,
      ExerciseFragment,
      ExercisePresetFragment,
      ExercisePresetWithListFragment,
    ),
    typePolicies: {
      Query: {
        fields: {
          getScheduleStatusByDate: offsetLimitPagination(['year', 'month']),
          getExercisePresetWithListList: offsetLimitPagination(),
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