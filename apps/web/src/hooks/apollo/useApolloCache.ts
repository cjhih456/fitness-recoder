import type { DocumentNode } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { createFragmentRegistry } from '@apollo/client/cache';
import { offsetLimitPagination } from '@apollo/client/utilities';
import ExerciseFragment from '@graphQuery/Fragment/ExerciseFragment';
import ExercisePresetFragment from '@graphQuery/Fragment/ExercisePresetFragment';
import ExercisePresetWithListFragment from '@graphQuery/Fragment/ExercisePresetWithListFragment';
import FitnessFragment from '@graphQuery/Fragment/FitnessFragment';
import FitnessSimpleFragment from '@graphQuery/Fragment/FitnessSimpleFragment';
import ScheduleSimpleFragment from '@graphQuery/Fragment/ScheduleSimpleFragment';
import ScheduleTimeFragment from '@graphQuery/Fragment/ScheduleTimeFragment';
import SetsFragment from '@graphQuery/Fragment/SetsFragment';
import GetFitnessLisyByIds from '@graphQuery/Query/Fitness/GetFitnessLisyByIds';

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
  addTypename: false,
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