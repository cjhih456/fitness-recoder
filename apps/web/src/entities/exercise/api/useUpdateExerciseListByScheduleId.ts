import { useMutation } from '@apollo/client'
import UpdateExerciseListByScheduleId from './graphql/mutation/UpdateExerciseListByScheduleId';

export default function useUpdateExerciseListByScheduleId() {
  return useMutation<
    UpdateExerciseListByScheduleIdResponse,
    UpdateExerciseListByScheduleIdVariable
  >(UpdateExerciseListByScheduleId)

}