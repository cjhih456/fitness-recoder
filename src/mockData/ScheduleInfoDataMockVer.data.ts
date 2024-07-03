import { useScheduleInfoStore } from '../service/Store/ScheduleInfoStore';
import { jest } from '@storybook/jest'
import ScheduleExerciseDataMockVer from './ScheduleExerciseDataMockVer.data';

const scheduleInfoData = {
  '00000000-0000-0000-0001-000000000000': {
    id: '00000000-0000-0000-0001-000000000000',
    exerciseList: ['00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000001'],
    type: 'STARTED',
    workoutTimes: 0,
    year: 2024,
    month: 5,
    date: 10,
    beforeTime: 0,
    breakTime: 60,
    start: new Date().getTime()
  }
} as { [id: string]: Schedule }

export default function ScheduleInfoDataMockVer() {
  const scheduleInfoStore = useScheduleInfoStore()

  jest.spyOn(scheduleInfoStore, 'getSchedule').mockImplementation((id) => {
    return scheduleInfoData[id]
  })
  ScheduleExerciseDataMockVer()
}