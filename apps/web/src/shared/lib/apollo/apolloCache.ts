import { InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import fragmentRegistry from '@shared/lib/apollo/fragmentRegistry'
// @ts-ignore: Unreachable code error. will be auto generate
import PossibleTypes from '@shared/lib/apollo/possibleTypes.json'

export default new InMemoryCache({
  fragments: fragmentRegistry,
  typePolicies: {
    Query: {
      fields: {
        getScheduleStatusByMonth: offsetLimitPagination(['year', 'month']),
        getExercisePresetWithListList: offsetLimitPagination(),
        getFitnessListByKeywords: offsetLimitPagination(['name', 'category', 'muscle']),
        getScheduleByDate: offsetLimitPagination(['year', 'month', 'date']),
      }
    }
  },
  addTypename: true,
  possibleTypes: PossibleTypes
})
