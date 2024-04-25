import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Schedule } from './Schedule';

type ScheduleStoreState = {
  store: ScheduleStore
};

type ScheduleStoreAction = {
  setScheduleData: (schedule: Schedule) => void
  getScheduleData: (year: number, month: number, date: number) => Schedule[]
}

const initStore: ScheduleStoreState = {
  store: {}
}

export const useScheduleStore = create<ScheduleStoreState & ScheduleStoreAction>()(devtools((set, get) => ({
  ...initStore,
  setScheduleData: (schedule) => {
    return set((state) => {
      const date = `${schedule.year}-${schedule.month}-${schedule.date}`
      const hasBefore = get().getScheduleData(schedule.year, schedule.month, schedule.date)
      return {
        ...state,
        store: { ...state.store, [date]: hasBefore.concat(schedule) }
      }
    })
  },
  getScheduleData: (year: number, month: number, date: number) => {
    return get().store[`${year}-${month}-${date}`] || []
  },
})));