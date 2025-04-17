import type { MockedResponse } from '@apollo/client/testing';
import type { ExercisePreset } from '@fitness/struct'
import { ExercisePresetMockData } from '@entities/exercisePreset/api/exercisePreset.mockData';
import CloneScheduleFromPreset from '@entities/schedule/api/graphql/mutation/CloneScheduleFromPresetGql';
import { ScheduleMockData } from '@entities/schedule/api/schedule.mockData';

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
      date: v.targetDate.date
    }
    return {
      data: {
        cloneScheduleFromPreset: ScheduleMockData[id]
      }
    }
  }
}
export default CloneScheduleFromPresetMock
