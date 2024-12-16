import { useLazyQuery } from '@apollo/client';
import GetExerciseFinishHistory from '@graphQuery/Query/Exercise/GetExerciseFinishHistory';

export default function useLazyGetExerciseFinishHistory() {
  return useLazyQuery<
    GetExerciseFinishHistoryResponse,
    GetExerciseFinishHistoryVariable
  >(GetExerciseFinishHistory)
}