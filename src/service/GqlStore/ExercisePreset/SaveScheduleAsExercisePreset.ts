import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ExercisePresetMockData } from '.'

type SaveScheduleAsExercisePresetResponse = { saveScheduleAsExercisePreset: ExercisePreset }
type SaveScheduleAsExercisePresetVariable = { scheduleId: number, name: string }
const saveScheduleAsExercisePresetGql = gql`
mutation SaveScheduleAsExercisePreset($scheduleId: ID!, $name: String!) {
  saveScheduleAsExercisePreset(scheduleId: $scheduleId, name: $name) {
    id
    name
  }
}
`
export function useSaveScheduleAsExercisePreset() {
  return useMutation<SaveScheduleAsExercisePresetResponse, SaveScheduleAsExercisePresetVariable>(saveScheduleAsExercisePresetGql)
}
export const SaveScheduleAsExercisePresetMock: MockedResponse<
  SaveScheduleAsExercisePresetResponse,
  SaveScheduleAsExercisePresetVariable
> = {
  request: {
    query: saveScheduleAsExercisePresetGql,
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
        saveScheduleAsExercisePreset: ExercisePresetMockData[id]
      }
    }
  }
}