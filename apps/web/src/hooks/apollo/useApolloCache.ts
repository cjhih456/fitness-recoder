import type { DocumentNode } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { createFragmentRegistry } from '@apollo/client/cache';
import { offsetLimitPagination } from '@apollo/client/utilities';
import ExerciseFragment from '@hooks/apollo/Exercise/graphql/fragment/ExerciseFragment';
import ExercisePresetFragment from '@hooks/apollo/ExercisePreset/graphql/fragments/ExercisePresetFragment';
import ExercisePresetWithListFragment from '@hooks/apollo/ExercisePreset/graphql/fragments/ExercisePresetWithListFragment';
import FitnessFragment from '@hooks/apollo/Fitness/graphql/fragment/FitnessFragment';
import FitnessSimpleFragment from '@hooks/apollo/Fitness/graphql/fragment/FitnessSimpleFragment';
import GetFitnessLisyByIds from '@hooks/apollo/Fitness/graphql/query/GetFitnessLisyByIds';
import ScheduleSimpleFragment from '@hooks/apollo/Schedule/graphql/fragment/ScheduleSimpleFragment';
import ScheduleTimeFragment from '@hooks/apollo/Schedule/graphql/fragment/ScheduleTimeFragment';
import SetsFragment from '@hooks/apollo/Set/graphql/fragment/SetsFragment';

const PossibleTypes = () => import.meta.glob<Record<string, string[]>>('./possibleTypes.json', {
  import: 'default'
})

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

export default function useApolloCache() {
  return Promise.all(Object.values(PossibleTypes()).map(async (it) => {
    return await it()
  })).then((PossibleTypesData) => {
    cache.policies.addPossibleTypes(PossibleTypesData[0])
    cache.transformDocument(GetFitnessLisyByIds)
    return cache
  })
}

export const TransformDocument = (docs: DocumentNode) => {
  const translatedDocs = cache.transformDocument(docs)
  return translatedDocs
}