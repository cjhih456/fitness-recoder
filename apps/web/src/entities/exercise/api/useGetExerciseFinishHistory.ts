import { useSuspenseQuery } from '@apollo/client'
import GetExerciseFinishHistory from '@entities/exercise/api/query/GetExerciseFinishHistory';

export default function useGetExerciseFinishHistory(exerciseId: number) {
  return useSuspenseQuery<
    GetExerciseFinishHistoryResponse,
    GetExerciseFinishHistoryVariable
  >(GetExerciseFinishHistory, {
    variables: { exerciseId: Number(exerciseId) }
  })
}