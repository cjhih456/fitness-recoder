import { Exercise } from "./exercise"


export declare namespace Schedule {
  enum IType {
    BREAK = 'BREAK',
    SCHEDULED = 'SCHEDULED',
    STARTED = 'STARTED',
    PAUSED = 'PAUSED',
    FINISH = 'FINISH',
  }

  interface Data {
    start: number
    breakTime: number
    workoutTimes: number
    type: keyof typeof IType
    /** ExerciseData key */
    exerciseList?: Exercise.Data[]
  }

  interface ICreate extends Data {
    year: number
    month: number
    date: number
    beforeTime: number
  }

  interface Schedule extends ICreate {
    id: number
  }
}