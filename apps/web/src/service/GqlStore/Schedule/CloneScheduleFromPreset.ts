import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { ScheduleMockData, ScheduleStoreType } from '.'
import { ExercisePresetMockData } from '../ExercisePreset'
import { ExercisePreset } from 'fitness-struct'
import { GetScheduleByDateResponse } from './GetScheduleByDate'


type CloneScheduleFromPresetResponse = { cloneScheduleFromPreset: ScheduleStoreType }
type CloneScheduleFromPresetVariable = { presetId: number, targetDate: { year: number, month: number, date: number } }
const CloneScheduleFromPresetGql = gql`
mutation CloneScheduleFromPreset($presetId: Int!, $targetDate: TargetDateInput) {
  cloneScheduleFromPreset(presetId: $presetId, targetDate: $targetDate) {
    ...ScheduleSimple
  }
}
`
export function useCloneScheduleFromPreset() {
  return useMutation<CloneScheduleFromPresetResponse, CloneScheduleFromPresetVariable>(CloneScheduleFromPresetGql, {
    update: (cache, result) => {
      cache.modify<{
        getScheduleByDate: GetScheduleByDateResponse['getScheduleByDate']
      }>({
        fields: {
          getScheduleByDate(prev, { toReference }) {
            if (!prev || !result.data?.cloneScheduleFromPreset) return prev
            const ref = toReference(result.data?.cloneScheduleFromPreset, true)
            return [...prev, ref]
          }
        }
      })
    }
  })
}
export const CloneScheduleFromPresetMock: MockedResponse<CloneScheduleFromPresetResponse, CloneScheduleFromPresetVariable> = {
  request: {
    query: CloneScheduleFromPresetGql
  },
  result: (v) => {
    const id = Math.max(...Object.keys(ScheduleMockData).map(Number)) + 1
    ScheduleMockData[id] = {
      ...(ExercisePresetMockData[v.presetId] as ExercisePreset.Preset),
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