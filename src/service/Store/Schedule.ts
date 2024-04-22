export class Schedule {
  year: number
  month: number
  date: number
  start: number
  breakTime: number
  type: ScheduleType
  workoutTimes: number
  exerciseList: ExerciseData[] = []
  constructor(year: number, month: number, date: number) {
    this.year = year
    this.month = month
    this.date = date
    this.start = 0
    this.workoutTimes = 0
    this.breakTime = 60
    this.type = ScheduleType.SCHEDULED
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

  static calanderColor(year: number, month: number, date: number, selectedYear: number, selectedMonth: number, selectedDate: number, scheduleList: ScheduleData[]) {
    if(
      year === selectedYear &&
      month === selectedMonth &&
      date === selectedDate
    ) return 'bg-primary'

    if (scheduleList.length) {
      switch(scheduleList[0].type) {
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
