import type { MockedResponse } from '@apollo/client/testing';
import type { ExercisePreset } from 'fitness-struct'
import { useMutation } from '@apollo/client'
import CloneScheduleFromPreset from '@hooks/apollo/Schedule/graphql/mutation/CloneScheduleFromPresetGql';
import { ExercisePresetMockData } from '@hooks/apollo/ExercisePreset'
import { ScheduleMockData } from '.'

export default function useCloneScheduleFromPreset() {
  return useMutation<CloneScheduleFromPresetResponse, CloneScheduleFromPresetVariable>(CloneScheduleFromPreset, {
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
    query: CloneScheduleFromPreset
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