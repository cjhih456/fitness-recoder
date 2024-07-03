import { useScheduleExerciseDataStore } from '../service/Store/ScheduleExerciseDataStore';
import { jest } from '@storybook/jest'
import ScheduleSetDataMockVer from './ScheduleSetDataMockVer.data';



const scheduleExerciseData = {
  '00000000-0000-0000-0000-000000000000': {
    exercise: 1,
    sets: ['00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002']
  },
  '00000000-0000-0000-0000-000000000001': {
    exercise: 2,
    sets: ['00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000004']
  }
} as { [id: string]: ExerciseData }



export default function ScheduleExerciseDataMockVer() {
  const scheduleExerciseDataStore = useScheduleExerciseDataStore()

  jest.spyOn(scheduleExerciseDataStore, 'getExerciseData').mockImplementation((id) => {
    return scheduleExerciseData[id]
  })
  ScheduleSetDataMockVer()

}