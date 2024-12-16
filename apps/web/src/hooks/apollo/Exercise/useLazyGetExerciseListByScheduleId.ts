import { useLazyQuery } from '@apollo/client';
import GetExerciseListByScheduleId from '@graphQuery/Query/Exercise/GetExerciseListByScheduleId';

export default function useLazyGetExerciseListByScheduleId() {
  return useLazyQuery<
    GetExerciseListByScheduleIdResponse,
    GetExerciseListByScheduleIdVariable
  >(GetExerciseListByScheduleId)
}