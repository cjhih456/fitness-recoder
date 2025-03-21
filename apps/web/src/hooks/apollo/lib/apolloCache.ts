import { InMemoryCache } from '@apollo/client';
import { createFragmentRegistry } from '@apollo/client/cache';
import { offsetLimitPagination } from '@apollo/client/utilities';
import ExerciseFragment from '@hooks/apollo/Exercise/graphql/fragment/ExerciseFragment';
import ExercisePresetFragment from '@hooks/apollo/ExercisePreset/graphql/fragments/ExercisePresetFragment';
import ExercisePresetWithListFragment from '@hooks/apollo/ExercisePreset/graphql/fragments/ExercisePresetWithListFragment';
import FitnessFragment from '@hooks/apollo/Fitness/graphql/fragment/FitnessFragment';
import FitnessSimpleFragment from '@hooks/apollo/Fitness/graphql/fragment/FitnessSimpleFragment';
import ScheduleSimpleFragment from '@hooks/apollo/Schedule/graphql/fragment/ScheduleSimpleFragment';
import ScheduleTimeFragment from '@hooks/apollo/Schedule/graphql/fragment/ScheduleTimeFragment';
import SetsFragment from '@hooks/apollo/Set/graphql/fragment/SetsFragment';
// @ts-ignore: Unreachable code error. will be auto generate
import PossibleTypes from './possibleTypes.json'

export default new InMemoryCache({
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
  },
  addTypename: true,
  possibleTypes: PossibleTypes
})