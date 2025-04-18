import type { MockedResponse } from '@apollo/client/testing';
import { ExercisePresetMockData } from './exercisePreset.mockData'
import CopyExercisePresetFromScheduleGql from './graphql/mutation/CopyExercisePresetFromScheduleGql';

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