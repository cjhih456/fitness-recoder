import type { Exercise } from './exercise';

export declare namespace Schedule {
  type IType = 'BREAK' |
    'SCHEDULED' |
    'STARTED' |
    'PAUSED' |
    'FINISH'

  interface Data {
    start: number
    breakTime: number
    workoutTimes: number
    type: IType
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