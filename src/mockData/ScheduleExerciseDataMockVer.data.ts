import { ScheduleExerciseDataStoreType, useScheduleExerciseDataStore } from '../service/Store/ScheduleExerciseDataStore';
import { jest } from '@storybook/jest'
import ScheduleSetDataMockVer from './ScheduleSetDataMockVer.data';
import { create } from 'zustand';

const useScheduleExerciseData = create<ScheduleExerciseDataStoreType & MockStoreActions<ExerciseData>>((set, get) => ({
  store: {
    '00000000-0001-0000-0000-000000000000': {
      exercise: 1,
      sets: ['00000000-0000-0001-0000-000000000000', '00000000-0000-0002-0000-000000000000']
    },
    '00000000-0002-0000-0000-000000000000': {
      exercise: 2,
      sets: ['00000000-0000-0003-0000-000000000000', '00000000-0000-0004-0000-000000000000']
    }
  },
  setStore(id, obj) {
    set((state) => ({
      ...state,
      store: {
        ...state.store,
        [id]: obj
      }
    }), true)
  },
  getData(id) {
    return get().store[id]
  },
  deleteData(id) {
    set((state) => {
      const store = Object.assign({}, state.store)
      delete store[id]
      return {
        ...state,
        store: store
      }
    })
  }
}))



export default function ScheduleExerciseDataMockVer() {
  const scheduleExerciseDataStore = useScheduleExerciseDataStore()
  const scheduleExerciseData = useScheduleExerciseData()
  jest.spyOn(scheduleExerciseDataStore, 'getExerciseData').mockImplementation((id) => scheduleExerciseData.store[id])
  jest.spyOn(scheduleExerciseDataStore, 'baseFunction').mockImplementation((id, fn) => {
    if (!scheduleExerciseData.getData(id)) return
    const schedule = Object.assign({}, scheduleExerciseData.getData(id))
    fn(schedule)
    scheduleExerciseData.setStore(id, schedule)
  })
  jest.spyOn(scheduleExerciseDataStore, 'createExerciseData').mockImplementation((exercise) => {
    const num = Object.keys(scheduleExerciseData.store).length + 1
    const id = `00000000-${String(num).padStart(4, '0')}-0000-0000-000000000000`
    scheduleExerciseData.setStore(id, {
      exercise,
      sets: []
    })
    return id
  })
  jest.spyOn(scheduleExerciseDataStore, 'removeExerciseData').mockImplementation((id) => {
    scheduleExerciseData.deleteData(id)
  })


  ScheduleSetDataMockVer()

}