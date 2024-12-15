import { InMemoryCache } from '@apollo/client';
import { createFragmentRegistry } from '@apollo/client/cache';
import { offsetLimitPagination } from '@apollo/client/utilities';
import ExercisePresetFragment from '@graphQuery/Fragment/ExercisePresetFragment';
import ExercisePresetWithListFragment from '@graphQuery/Fragment/ExercisePresetWithListFragment';
import FitnessFragment from '@graphQuery/Fragment/FitnessFragment';
import FitnessSimpleFragment from '@graphQuery/Fragment/FitnessSimpleFragment';
import { ExerciseFragment } from '@service/GqlStore/Exercise';
import { ScheduleSimpleFragment, ScheduleTimeFragment } from '@service/GqlStore/Schedule';
import { SetsFragment } from '@service/GqlStore/Set';

const PossibleTypes = () => import.meta.glob<Record<string, string[]>>('./possibleTypes.json', {
  import: 'default'
})

export default function useApolloCache() {
  const cache = new InMemoryCache({
    fragments: createFragmentRegistry(
      SetsFragment,
      ScheduleTimeFragment,
      ScheduleSimpleFragment,
      FitnessSimpleFragment,
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
  Promise.all(Object.values(PossibleTypes()).map(async (it) => {
    return await it()
  })).then((PossibleTypesData) => {
    cache.policies.addPossibleTypes(PossibleTypesData[0])
  })
  return cache
}