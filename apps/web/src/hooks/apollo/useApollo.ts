import { ApolloClient, InMemoryCache } from '@apollo/client'
import { link } from './HttpLink'
import { offsetLimitPagination } from '@apollo/client/utilities'
import { createFragmentRegistry } from '@apollo/client/cache'
import { SetsFragment } from '../../service/GqlStore/Set'
import { ScheduleSimpleFragment, ScheduleTimeFragment } from '../../service/GqlStore/Schedule'
import { FitnessDetailFragment, FitnessFragment, FitnessSimpleFragment } from '../../service/GqlStore/Fitness'
import { ExercisePresetFragment, ExercisePresetWithListFragment } from '../../service/GqlStore/ExercisePreset'
import { ExerciseFragment } from '../../service/GqlStore/Exercise'

const PossibleTypes = () => import.meta.glob<Record<string, string[]>>('./possibleTypes.json', {
  import: 'default'
})

export const useApollo = async () => {
  const PossibleTypesData = await Promise.all(Object.values((await PossibleTypes())).map(async (it) => {
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