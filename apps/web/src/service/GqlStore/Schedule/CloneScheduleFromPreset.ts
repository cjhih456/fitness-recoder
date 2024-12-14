import type { ScheduleStoreType } from '.';
import type { GetScheduleByDateResponse } from './GetScheduleByDate';
import type { MockedResponse } from '@apollo/client/testing';
import type { ExercisePreset } from 'fitness-struct'
import { gql, useMutation } from '@apollo/client'
import { ExercisePresetMockData } from '@service/GqlStore/ExercisePreset'
import { ScheduleMockData } from '.'

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