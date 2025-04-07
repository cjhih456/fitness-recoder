import type { DocumentNode } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';
import { createFragmentRegistry } from '@apollo/client/cache';
import { offsetLimitPagination } from '@apollo/client/utilities';
// @ts-ignore: Unreachable code error. will be auto generate
import PossibleTypes from '@shared/lib/apollo/possibleTypes.json'

export default function getApolloCache({
  fragmentList = []
}: {
  fragmentList?: DocumentNode[]
}) {
  return new InMemoryCache({
    fragments: createFragmentRegistry(...fragmentList),
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
}
