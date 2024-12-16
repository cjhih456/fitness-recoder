import type { MockedResponse } from '@apollo/client/testing';
import { useMutation } from '@apollo/client'
import CopyExercisePresetFromScheduleGql from '@graphQuery/Mutation/ExercisePreset/CopyExercisePresetFromScheduleGql';
import { ExercisePresetMockData } from '.'

export default function useCopyExercisePresetFromSchedule() {
  return useMutation<CopyExercisePresetFromScheduleResponse, CopyExercisePresetFromScheduleVariable>(CopyExercisePresetFromScheduleGql)
}
export const CopyExercisePresetFromScheduleMock: MockedResponse<
  CopyExercisePresetFromScheduleResponse,
  CopyExercisePresetFromScheduleVariable
> = {
  request: {
    query: CopyExercisePresetFromScheduleGql,
  },
  result: (v) => {
    const id = Math.max(...Object.keys(ExercisePresetMockData).map(Number)) + 1
    ExercisePresetMockData[id] = {
      name: v.name,
      id: id,
      deps: 0
    }
    return {
      data: {
        copyExercisePresetFromSchedule: ExercisePresetMockData[id]
      }
    }
  }
}