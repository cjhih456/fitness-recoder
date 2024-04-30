import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


type ScheduleStoreState = {
  store: { [key: string]: string[] }
};

type ScheduleStoreAction = {
  getRelationByDate: (year: number, month: number, date: number) => string[]
  addRelationByDate: (year: number, month: number, date: number, id: string) => void
  removeRelationByDate: (year: number, month: number, date: number, id: string) => void
}


export const useScheduleKeyStore = create<ScheduleStoreState & ScheduleStoreAction>()(
  persist(
    (set, get) => ({
      store: {},
      getRelationByDate: (year, month, date) => {
        return get().store[`${year}-${month}-${date}`] || []
      },
      addRelationByDate: (year, month, date, id) => {
        const before = get().getRelationByDate(year, month, date)
        if (before.includes(id)) return
        set((state) => ({
          ...state,
          store: {
            ...state.store,
            [`${year}-${month}-${date}`]: ([] as string[]).concat(before, id)
          }
        }))
      },
      removeRelationByDate: (year, month, date, id) => {
        const before = get().getRelationByDate(year, month, date)
        if (!before.includes(id)) return
        set((state) => ({
          ...state,
          store: {
            ...state.store,
            [`${year}-${month}-${date}`]: before.filter(v => v !== id)
          }
        }))
      }
    }),
    {
      name: 'fitness-key-data',
      storage: createJSONStorage(() => localStorage)
    }
  )
);