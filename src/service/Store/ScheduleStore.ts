import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
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

export const useScheduleStore = create<ScheduleStoreState & ScheduleStoreAction>()(
  persist(
    (set, get) => ({
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
      getScheduleData: (year, month, date) => {
        return get().store[`${year}-${month}-${date}`] || []
      },
    }),
    {
      name: 'fitness-data',
      storage: createJSONStorage(() => localStorage)
    }
  )
);