import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid'
import { createJSONStorage, persist } from 'zustand/middleware';

type ScheduleExerciseDataStoreType = {
  store: { [key: string]: ExerciseData }
}

type ScheduleExerciseDataStoreAction = {
  baseFunction: (id: string, fn: (exerciseData: ExerciseData) => void) => void
  createExerciseData: (exercise: number) => string
  getExerciseData: (id: string) => ExerciseData
  changeExerciseById: (id: string, exercise: number) => void
  removeExerciseData: (exerciseDataIdx: string) => void
}

export const useScheduleExerciseDataStore = create<ScheduleExerciseDataStoreType & ScheduleExerciseDataStoreAction>()(
  persist((set, get) => ({
    store: {},
    baseFunction: (id, fn) => {
      if (!get().store[id]) return
      const exerciseData = Object.assign({}, get().store[id])
      fn(exerciseData)
      set((state) => ({
        ...state,
        store: {
          ...state.store,
          [id]: exerciseData
        }
      }))
    },
    createExerciseData: (exercise) => {
      const id = uuidv4()
      set(state => {
        const tempObj = {
          exercise,
          sets: []
        } as ExerciseData
        state.store[id] = tempObj
        return state
      })
      return id
    },
    getExerciseData: (id) => {
      return get().store[id]
    },
    changeExerciseById: (id, exerciseIdx) => {
      get().baseFunction(id, (exerciseData) => {
        exerciseData.exercise = exerciseIdx
      })
    },
    removeExerciseData: (exerciseDataIdx) => {
      const exerciseData = Object.assign({}, get().store)
      delete exerciseData[exerciseDataIdx]
      set((state) => ({
        ...state,
        store: exerciseData
      }))
    }
  }), {
    name: 'fitness-exercise-data',
    storage: createJSONStorage(() => localStorage)
  })
)