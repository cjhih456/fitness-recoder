import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ScheduleStoreState = {
  store: ScheduleStore
};

type ScheduleStoreAction = {
  setScheduleData: (schedule: ScheduleData) => void
  getScheduleData: (year: number, month: number, date: number) => ScheduleData[]
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