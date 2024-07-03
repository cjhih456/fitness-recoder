import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid'
import { createJSONStorage, persist } from 'zustand/middleware';

export type ScheduleSetStoreType = {
  store: { [key: string]: Sets }
}

type ScheduleSetStoreAction = {
  getSet: (setId: string) => Sets | undefined
  getSetList: (setIds: string[]) => Sets[]
  baseFunction: (id: string, fn: (scheduleSet: Sets) => void) => void
  createSet: () => string
  updateSetWeight: (id: string, weight: number) => void
  updateSetWeightUnit: (id: string, weightUnit: WeightUnit) => void
  updateSetIsDone: (id: string, isDone: boolean) => void
  updateSetRepeat: (id: string, repeat: number) => void
  updateSetDuration: (id: string, duration: number) => void
}

export const useScheduleSetStore = create<ScheduleSetStoreType & ScheduleSetStoreAction>()(
  persist((set, get) => ({
    store: {},
    getSet: (setId) => {
      return get().store[setId]
    },
    getSetList: (setIds) => {
      return setIds.map(v => get().store[v])
    },
    createSet: () => {
      const id = uuidv4()
      set(state => {
        const tempObj = {
          id,
          isDone: false,
          repeat: 10,
          weightUnit: 'kg',
          weight: 0,
          duration: 0
        } as Sets
        state.store[id] = tempObj
        return state
      })
      return id
    },
    baseFunction: (id, fn) => {
      if (!get().store[id]) return
      const schedule = Object.assign({}, get().store[id])
      fn(schedule)
      set((state) => ({
        ...state,
        store: {
          ...state.store,
          [id]: schedule
        }
      }))
    },
    updateSetWeight: (id, weight) => {
      get().baseFunction(id, (sets) => {
        sets.weight = weight
      })
    },
    updateSetWeightUnit: (id, weightUnit) => {
      get().baseFunction(id, (sets) => {
        sets.weightUnit = weightUnit
      })
    },
    updateSetIsDone: (id, isDone) => {
      get().baseFunction(id, (sets) => {
        sets.isDone = isDone
      })
    },
    updateSetRepeat: (id, repeat) => {
      get().baseFunction(id, (sets) => {
        sets.repeat = repeat
      })
    },
    updateSetDuration: (id, duration) => {
      get().baseFunction(id, (sets) => {
        sets.duration = duration
      })
    }
  }), {
    name: 'fitness-set-data',
    storage: createJSONStorage(() => localStorage)
  })
)