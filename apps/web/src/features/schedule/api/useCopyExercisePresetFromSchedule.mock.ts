import type { MockedResponse } from '@apollo/client/testing';
import type { CopyExercisePresetFromScheduleResponse, CopyExercisePresetFromScheduleVariable } from '@features/schedule/model';
import { ExercisePresetMockData } from '@entities/exercisePreset/api/exercisePreset.mockData'
import CopyExercisePresetFromScheduleGql from '@features/schedule/api/mutation/CopyExercisePresetFromScheduleGql';

const CopyExercisePresetFromScheduleMock: MockedResponse<
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
      exerciseList: [],
      __typename: 'ExercisePreset'
    }
    return {
      data: {
        copyExercisePresetFromSchedule: ExercisePresetMockData[id]
      }
    }
  }
}
export default CopyExercisePresetFromScheduleMock