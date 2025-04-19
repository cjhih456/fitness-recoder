import { useMutation } from '@apollo/client'
import UpdateExerciseListByScheduleId from '../../../entities/exercise/api/mutation/UpdateExerciseListByScheduleId';

export default function useUpdateExerciseListByScheduleId() {
  return useMutation<
    UpdateExerciseListByScheduleIdResponse,
    UpdateExerciseListByScheduleIdVariable
  >(UpdateExerciseListByScheduleId)

}