import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid'
import { createJSONStorage, persist } from 'zustand/middleware';


type SchedulePresetStoreState = {
  store: { [key: string]: ExercisePreset }
};
type SchedulePresetStoreAction = {
  getSchedulePreset: (id: string) => ExercisePreset | undefined
  getSchedulePresetList: () => ExercisePreset[]
  baseFunction: (id: string, fn: (preset: ExercisePreset) => void) => void
  createSchedulePreset: (name: string) => string
  addExercise: (id: string, exercise: string | string[]) => void
  deletePreset: (id: string) => void
}

export const useSchedulePresetStore = create<SchedulePresetStoreState & SchedulePresetStoreAction>()(
  persist((set, get) => ({
    store: {},
    getSchedulePreset: (id) => get().store[id],
    getSchedulePresetList: () => {
      return Object.keys(get().store).map(v => get().getSchedulePreset(v)).filter(Boolean) as ExercisePreset[]
    },
    baseFunction: (id, fn) => {
      if (!get().store[id]) return
      const schedule = Object.assign({}, get().store[id])
      fn(schedule)
      set(() => ({
        store: {
          [id]: schedule
        }
      }))
    },
    createSchedulePreset: (name) => {
      const id = uuidv4()
      set(() => ({
        store: {
          [id]: {
            id,
            name: name,
            exerciseList: []
          }
        }
      }))
      return id
    },
    addExercise: (id, exercise) => {
      get().baseFunction(id, (schedule) => {
        if (Array.isArray(exercise)) {
          schedule.exerciseList = ([] as string[]).concat(exercise)
        } else {
          schedule.exerciseList = ([] as string[]).concat(schedule.exerciseList, exercise)
        }
      })
    },
    deletePreset: (id) => {
      set((state) => {
        const store = Object.assign({}, state.store)
        delete store[id]
        return {
          ...state,
          store: store
        }
      }, true)
    }
  }), {
    name: 'fitness-preset-data',
    storage: createJSONStorage(() => localStorage)
  })
)