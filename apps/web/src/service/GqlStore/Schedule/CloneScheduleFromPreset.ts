import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ScheduleMockData } from '.'
import { ExercisePresetMockData } from '../ExercisePreset'


type CloneScheduleFromPresetResponse = { cloneScheduleFromPreset: Schedule }
type CloneScheduleFromPresetVariable = { presetId: number, targetDate: { year: number, month: number, date: number } }
const CloneScheduleFromPresetGql = gql`
mutation CloneScheduleFromPreset($presetId: ID!, $targetDate: TargetDateInput) {
  cloneScheduleFromPreset(presetId: $presetId, targetDate: $targetDate) {
    id
    year
    month
    date
    beforeTime
    start
    breakTime
    workoutTimes
    type
  }
}
`
export function useCloneScheduleFromPreset() {
  return useMutation<CloneScheduleFromPresetResponse, CloneScheduleFromPresetVariable>(CloneScheduleFromPresetGql)
}
export const CloneScheduleFromPresetMock: MockedResponse<CloneScheduleFromPresetResponse, CloneScheduleFromPresetVariable> = {
  request: {
    query: CloneScheduleFromPresetGql
  },
  result: (v) => {
    const id = Math.max(...Object.keys(ScheduleMockData).map(Number)) + 1
    ScheduleMockData[id] = {
      ...(ExercisePresetMockData[v.presetId] as ExercisePreset),
      beforeTime: 0,
      start: 0,
      breakTime: 0,
      workoutTimes: 0,
      type: 'SCHEDULED',
      id,
      year: v.targetDate.year,
      month: v.targetDate.month,
      date: v.targetDate.date
    }
    return {
      data: {
        cloneScheduleFromPreset: ScheduleMockData[id]
      }
    }
  }
}