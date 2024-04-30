enum IScheduleType {
  BREAK = 'BREAK',
  SCHEDULED = 'SCHEDULED',
  STARTED = 'STARTED',
  PAUSED = 'PAUSED',
  FINISH = 'FINISH',
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
  start: number
  breakTime: number
  workoutTimes: number
  type: keyof typeof IScheduleType
  exerciseList: ExerciseData[]
}


interface ScheduleStore {
  [date: string]: { [id: string]: Schedule }
}