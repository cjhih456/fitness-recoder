import { create } from 'zustand';

type AppState = {
  store: ScheduleStore
  setScheduleData: (schedule: ScheduleData) => void
  getScheduleData: (year: number, month: number, date: number) => ScheduleData[]
};

export const useScheduleStore = create<AppState>((set, get) => ({
  store: {},
  setScheduleData: (schedule) => {
    set((state) => {
      const date = `${schedule.year}-${schedule.month}-${schedule.date}`
      const hasBefore = get().getScheduleData(schedule.year,schedule.month, schedule.date)
      return {
        ...state,
        store: { ...state.store, [date]: hasBefore.concat(schedule) }
      }
    })
  },
  getScheduleData: (year: number, month: number, date: number) => {
    return get().store[`${year}-${month}-${date}`] || []
  },
}));