import type { MockedResponse } from '@apollo/client/testing';
import { useMutation } from '@apollo/client'
import CopyExercisePresetFromScheduleGql from '@hooks/apollo/ExercisePreset/graphql/mutation/CopyExercisePresetFromScheduleGql';
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
      deps: 0,
      __typename: 'ExercisePreset'
    }
    return {
      data: {
        copyExercisePresetFromSchedule: ExercisePresetMockData[id]
      }
    }
  }
}