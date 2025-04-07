import { useSuspenseQuery } from '@apollo/client'
import GetExerciseListByScheduleId from '../api/graphql/query/GetExerciseListByScheduleId';

export default function useGetExerciseListByScheduleId(scheduleId: number) {
  return useSuspenseQuery<
    GetExerciseListByScheduleIdResponse,
    GetExerciseListByScheduleIdVariable
  >(GetExerciseListByScheduleId, {
    variables: { scheduleId }
  })
}