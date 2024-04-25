import { action, makeObservable, observable } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

export const enum ScheduleType {
  BREAK = 'BREAK',
  FINISH = 'FINISH',
  SCHEDULED = 'SCHEDULED',
  STARTED = 'STARTED'
}
// https://ko.mobx.js.org/README.html#%EA%B0%84%EB%8B%A8%ED%95%9C-%EC%98%88%EC%A0%9C
export class Schedule implements ScheduleData {
  id: string
  year: number
  month: number
  date: number
  start: number = 0
  breakTime: number = 60
  type: ScheduleType = ScheduleType.SCHEDULED
  workoutTimes: number = 0
  exerciseList: ExerciseData[] = []
  constructor(obj: ScheduleData)
  constructor(year: number, month: number, date: number)
  constructor(...arg: [object] | [number, number, number]) {
    this.id = uuidv4()
    makeObservable(this, {
      id: observable,
      year: observable,
      month: observable,
      date: observable,
      start: observable,
      breakTime: observable,
      type: observable,
      exerciseList: observable,
      workoutTimes: observable,
      startSchedule: action,
      addExercise: action,
      updateBreakTime: action,
      setBreakDay: action,
    })
    if (arg.length === 1) {
      const data = arg[0] as ScheduleData
      this.year = data.year
      this.month = data.month
      this.date = data.date
      this.start = data.start
      this.breakTime = data.breakTime
      if (data.type === 'BREAK' || data.type === 'FINISH' || data.type === 'SCHEDULED' || data.type === 'STARTED') {
        this.type = data.type as ScheduleType
      }
      this.workoutTimes = data.workoutTimes
      this.exerciseList = data.exerciseList
    } else {
      this.year = arg[0]
      this.month = arg[1]
      this.date = arg[2]
    }
  }

  startSchedule() {
    this.start = Number(new Date().getTime() / 1000)
    this.type = ScheduleType.STARTED
  }

  addExercise(exercise: ExerciseData) {
    this.exerciseList.push(exercise)
  }

  updateBreakTime(t: number) {
    this.breakTime = t
  }

  setBreakDay() {
    this.exerciseList.splice(0, this.exerciseList.length)
    this.start = 0
    this.workoutTimes = 0
    this.type = ScheduleType.BREAK
  }

  static calanderColor(year: number, month: number, date: number, selectedYear: number, selectedMonth: number, selectedDate: number, scheduleList: ScheduleData[]) {
    if (
      year === selectedYear &&
      month === selectedMonth &&
      date === selectedDate
    ) return 'bg-primary'

    if (scheduleList.length) {
      switch (scheduleList[0].type) {
        case ScheduleType.BREAK:
          return 'bg-warning-500 text-default'
        case ScheduleType.FINISH:
          return 'bg-success-300'
        case ScheduleType.SCHEDULED:
          return 'bg-default'
        case ScheduleType.STARTED:
          return 'bg-success-700 text-success-100'
      }
    }
    return 'bg-default-500'
  }
}

export default {
  Schedule
}
