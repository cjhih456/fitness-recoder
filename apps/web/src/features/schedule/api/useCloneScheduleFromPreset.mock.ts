import type { CloneScheduleFromPresetResponse, CloneScheduleFromPresetVariable } from '../model';
import type { MockedResponse } from '@apollo/client/testing';
import type { ExercisePreset } from '@fitness/struct'
import { ExercisePresetMockData } from '@entities/exercisePreset/api/exercisePreset.mockData';
import { ScheduleMockData } from '@entities/schedule/api/schedule.mockData';
import CloneScheduleFromPreset from '@features/schedule/api/mutation/CloneScheduleFromPresetGql';
const CloneScheduleFromPresetMock: MockedResponse<CloneScheduleFromPresetResponse, CloneScheduleFromPresetVariable> = {
  request: {
    query: CloneScheduleFromPreset
  },
  result: (v) => {
    const id = Math.max(...Object.keys(ScheduleMockData).map(Number)) + 1
    ScheduleMockData[id] = {
      ...(ExercisePresetMockData[v.presetId] as ExercisePreset.WithExerciseList),
      beforeTime: 0,
      start: 0,
      breakTime: 0,
      workoutTimes: 0,
      type: 'SCHEDULED',
      id,
      year: v.targetDate.year,
      month: v.targetDate.month,
      date: v.targetDate.date,
      __typename: 'ScheduleData'
    }
    return {
      data: {
        cloneScheduleFromPreset: ScheduleMockData[id]
      }
    }
  }
}
export default CloneScheduleFromPresetMock
