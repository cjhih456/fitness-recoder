import { useMutation } from '@apollo/client'
import CreateExerciseBySchedule from '@entities/exercise/api/mutation/CreateExerciseBySchedule';

export default function useCreateExerciseBySchedule() {
  return useMutation<
    CreateExerciseByScheduleResponse,
    CreateExerciseByScheduleVariable
  >(CreateExerciseBySchedule)
}