import type { CopyExercisePresetFromScheduleResponse, CopyExercisePresetFromScheduleVariable } from '@features/schedule/model';
import { useMutation } from '@apollo/client'
import CopyExercisePresetFromScheduleGql from '@features/schedule/api/mutation/CopyExercisePresetFromScheduleGql';

export default function useCopyExercisePresetFromSchedule() {
  return useMutation<CopyExercisePresetFromScheduleResponse, CopyExercisePresetFromScheduleVariable>(CopyExercisePresetFromScheduleGql)
}
