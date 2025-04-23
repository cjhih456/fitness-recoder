import type { GetExerciseListByScheduleIdResponse, GetExerciseListByScheduleIdVariable } from '../model';
import { useSuspenseQuery } from '@apollo/client'
import GetExerciseListByScheduleId from './query/GetExerciseListByScheduleId';

export default function useGetExerciseListByScheduleId(scheduleId: number) {
  return useSuspenseQuery<
    GetExerciseListByScheduleIdResponse,
    GetExerciseListByScheduleIdVariable
  >(GetExerciseListByScheduleId, {
    variables: { scheduleId }
  })
}