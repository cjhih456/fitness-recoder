enum IScheduleType {
  BREAK = 'BREAK',
  FINISH = 'FINISH',
  SCHEDULED = 'SCHEDULED',
  STARTED = 'STARTED'
}

interface Sets {
  repeat: number,
  isDone: boolean,
  weightUnit: WeightUnit
  weight?: number
  duration?: number
}

interface ExerciseData {
  exercise: IExercise,
  sets: Sets[]
}

interface ExercisePreset {
  name: string
  exerciseList: ExerciseData[]
}

interface ScheduleData {
  year: number,
  month: number,
  date: number,
  start: number
  breakTime: number
  workoutTimes: number
  type: keyof typeof IScheduleType
  exerciseList: ExerciseData[]
}


interface ScheduleStore {
  [date: string]: Schedule[]
}