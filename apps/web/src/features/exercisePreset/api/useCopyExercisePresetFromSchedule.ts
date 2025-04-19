import { useMutation } from '@apollo/client'
import CopyExercisePresetFromScheduleGql from '@features/exercisePreset/api/mutation/CopyExercisePresetFromScheduleGql';

export default function useCopyExercisePresetFromSchedule() {
  return useMutation<CopyExercisePresetFromScheduleResponse, CopyExercisePresetFromScheduleVariable>(CopyExercisePresetFromScheduleGql)
}
