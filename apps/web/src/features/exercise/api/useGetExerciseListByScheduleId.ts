import { useSuspenseQuery } from '@apollo/client'
import GetExerciseListByScheduleId from '../../../entities/exercise/api/query/GetExerciseListByScheduleId';

export default function useGetExerciseListByScheduleId(scheduleId: number) {
  return useSuspenseQuery<
    GetExerciseListByScheduleIdResponse,
    GetExerciseListByScheduleIdVariable
  >(GetExerciseListByScheduleId, {
    variables: { scheduleId }
  })
}