import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ScheduleType } from './ScheduleStoreHooks'

type ScheduleStoreState = {
  store: { [key: string]: Schedule }
};

type ScheduleStoreAction = {
  getSchedule: (id: string) => Schedule
  baseFunction: (id: string, fn: (schedule: Schedule) => void) => void
  createSchedule: (year: number, month: number, date: number) => string
  setStartTime: (id: string, v: number) => void
  updateTimer: (id: string) => void
  addExercise: (id: string, exercise: string | string[]) => void
  startSchedule: (id: string) => void
  pauseSchedule: (id: string) => void
  successSchedule: (id: string) => void
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
        if (schedule.type !== ScheduleType.STARTED) return

        const nowTime = new Date().getTime()
        schedule.workoutTimes += nowTime - (schedule.beforeTime ?? schedule.start)
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
          schedule.exerciseList = ([] as string[]).concat(exercise)
        } else {
          schedule.exerciseList = ([] as string[]).concat(schedule.exerciseList, exercise)
        }
      })
    },

    startSchedule: (id) => {
      get().baseFunction(id, (schedule) => {
        const now = new Date().getTime()
        schedule.start = schedule.start || now
        schedule.beforeTime = now
        schedule.type = ScheduleType.STARTED
      })
    },
    pauseSchedule: (id) => {
      get().baseFunction(id, (schedule) => {
        schedule.type = ScheduleType.PAUSED
      })
    },
    successSchedule: (id) => {
      get().baseFunction(id, (schedule) => {
        schedule.type = ScheduleType.FINISH
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