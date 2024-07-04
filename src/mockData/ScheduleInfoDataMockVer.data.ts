import { ScheduleInfoStoreState, createSchedule, useScheduleInfoStore } from '../service/Store/ScheduleInfoStore';
import { spyOn } from '@storybook/test'
import ScheduleExerciseDataMockVer from './ScheduleExerciseDataMockVer.data';
import { create } from 'zustand';

const useScheduleInfoData = create<ScheduleInfoStoreState & MockStoreActions<Schedule>>((set, get) => ({
  store: {
    '00000001-0000-0000-0000-000000000000': {
      id: '00000001-0000-0000-0000-000000000000',
      exerciseList: ['00000000-0001-0000-0000-000000000000', '00000000-0002-0000-0000-000000000001'],
      type: 'STARTED',
      workoutTimes: 0,
      year: 2024,
      month: 5,
      date: 10,
      beforeTime: 0,
      breakTime: 60,
      start: new Date().getTime()
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

export default function ScheduleInfoDataMockVer() {
  const scheduleInfoStore = useScheduleInfoStore()
  const scheduleInfoData = useScheduleInfoData()
  spyOn(scheduleInfoStore, 'getSchedule').mockImplementation((id) => scheduleInfoData.getData(id))
  spyOn(scheduleInfoStore, 'createSchedule').mockImplementation((year, month, date) => {
    const number = Object.keys(scheduleInfoData.store).length + 1
    const id = `${String(number).padStart(8, '0')}-0000-0000-0000-000000000000`
    scheduleInfoData.setStore(id, createSchedule(id, year, month, date))
    return id
  })
  spyOn(scheduleInfoStore, 'baseFunction').mockImplementation((id, fn) => {
    if (!scheduleInfoData.getData(id)) return
    const schedule = Object.assign({}, scheduleInfoData.getData(id))
    fn(schedule)
    scheduleInfoData.setStore(id, schedule)
  })
  ScheduleExerciseDataMockVer()
}