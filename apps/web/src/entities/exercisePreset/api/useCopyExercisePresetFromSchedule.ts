import { useMutation } from '@apollo/client'
import CopyExercisePresetFromScheduleGql from './graphql/mutation/CopyExercisePresetFromScheduleGql';

export default function useCopyExercisePresetFromSchedule() {
  return useMutation<CopyExercisePresetFromScheduleResponse, CopyExercisePresetFromScheduleVariable>(CopyExercisePresetFromScheduleGql)
}
