import { useLazyQuery } from '@apollo/client';
import GetExerciseFinishHistory from '@hooks/apollo/Exercise/graphql/query/GetExerciseFinishHistory';

export default function useLazyGetExerciseFinishHistory() {
  return useLazyQuery<
    GetExerciseFinishHistoryResponse,
    GetExerciseFinishHistoryVariable
  >(GetExerciseFinishHistory)
}