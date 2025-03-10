import { useLazyQuery } from '@apollo/client';
import GetExerciseListByScheduleId from '@hooks/apollo/Exercise/graphql/query/GetExerciseListByScheduleId';

export default function useLazyGetExerciseListByScheduleId() {
  return useLazyQuery<
    GetExerciseListByScheduleIdResponse,
    GetExerciseListByScheduleIdVariable
  >(GetExerciseListByScheduleId)
}