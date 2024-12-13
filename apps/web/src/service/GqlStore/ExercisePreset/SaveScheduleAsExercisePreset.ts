import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ExercisePresetMockData, ExercisePresetStoreType } from '.'

type SaveScheduleAsExercisePresetResponse = { saveScheduleAsExercisePreset: ExercisePresetStoreType }
type SaveScheduleAsExercisePresetVariable = { scheduleId: number, name: string }
const saveScheduleAsExercisePresetGql = gql`
mutation SaveScheduleAsExercisePreset($scheduleId: Int!, $name: String!) {
  saveScheduleAsExercisePreset(scheduleId: $scheduleId, name: $name) {
    ...ExercisePresetFragment
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