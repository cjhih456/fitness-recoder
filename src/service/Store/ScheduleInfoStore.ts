import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ScheduleType } from './ScheduleStoreHooks'

export interface Schedule {
  id: string
  year: number
  month: number
  date: number
  start: number
  breakTime: number
  type: ScheduleType
  workoutTimes: number
  beforeTime: number
  exerciseList: ExerciseData[]
}

type ScheduleStoreState = {
  store: { [key: string]: Schedule }
};

type ScheduleStoreAction = {
  getSchedule: (id: string) => Schedule
  baseFunction: (id: string, fn: (schedule: Schedule) => void) => void
  createSchedule: (year: number, month: number, date: number) => string
  setStartTime: (id: string, v: number) => void
  updateTimer: (id: string) => void
  addExercise: (id: string, exercise: ExerciseData | ExerciseData[]) => void
  startSchedule: (id: string) => void
  pauseTimer: (id: string) => void
  setBreakDay: (id: string) => void
  updateBreakTime: (id: string, t: number) => void
}

const createSchedule = (id: string, year: number, month: number, date: number, beforeData?: Schedule) => ({
  id,
  year,
  month,
  date,
  start: beforeData?.start ?? 0,
  breakTime: beforeData?.breakTime ?? 60,
  type: beforeData?.type ?? ScheduleType.SCHEDULED,
  workoutTimes: beforeData?.workoutTimes ?? 0,
  beforeTime: beforeData?.beforeTime ?? 0,
  exerciseList: beforeData?.exerciseList ?? []
} as Schedule)



export const useScheduleInfoStore = create<ScheduleStoreState & ScheduleStoreAction>()(
  persist((set, get) => ({
    store: {},
    getSchedule(id) {
      return get().store[id]
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
    createSchedule: (year, month, date) => {
      const id = uuidv4()
      set((state) => {
        return {
          ...state,
          store: {
            ...state.store,
            [id]: createSchedule(id, year, month, date)
          }
        }
      })
      return id
    },
    setStartTime: (id, v) => {
      get().baseFunction(id, (schedule) => {
        schedule.start = v
      })
    },
    updateTimer: (id) => {
      get().baseFunction(id, (schedule) => {
        if (schedule.type !== ScheduleType.STARTED) return schedule

        const nowTime = Math.floor(new Date().getTime() / 1000)
        schedule.workoutTimes = nowTime - (schedule.beforeTime ?? schedule.start)
        schedule.beforeTime = nowTime
      })
    },
    updateBreakTime: (id, t) => {
      get().baseFunction(id, (schedule) => {
        schedule.breakTime = t
      })
    },
    addExercise: (id, exercise) => {
      get().baseFunction(id, (schedule) => {
        if (Array.isArray(exercise)) {
          schedule.exerciseList = ([] as ExerciseData[]).concat(exercise)
        } else {
          schedule.exerciseList = ([] as ExerciseData[]).concat(schedule.exerciseList, exercise)
        }
      })
    },
    startSchedule: (id) => {
      get().baseFunction(id, (schedule) => {
        schedule.start = Math.floor(new Date().getTime() / 1000)
        schedule.type = ScheduleType.STARTED
      })
    },
    pauseTimer: (id) => {
      get().baseFunction(id, (schedule) => {
        schedule.type = ScheduleType.PAUSED
      })
    },
    setBreakDay: (id) => {
      get().baseFunction(id, (schedule) => {
        schedule.exerciseList.splice(0, schedule.exerciseList.length)
        schedule.start = 0
        schedule.workoutTimes = 0
        schedule.type = ScheduleType.BREAK
      })
    },
  }), {
    name: 'fitness-info-data',
    storage: createJSONStorage(() => localStorage)
  })
)