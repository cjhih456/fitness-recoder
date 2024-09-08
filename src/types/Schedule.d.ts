enum IScheduleType {
  BREAK = 'BREAK',
  SCHEDULED = 'SCHEDULED',
  STARTED = 'STARTED',
  PAUSED = 'PAUSED',
  FINISH = 'FINISH',
}

interface Sets {
  id: string
  repeat: number
  isDone: boolean
  weightUnit: keyof typeof WeightUnit
  weight?: number
  duration?: number
}

interface ExerciseData {
  id: number
  /** IExercise.idx */
  exercise: number
  deps: number
}

interface ExercisePreset {
  id: number
  name: string
  /** ExerciseData key */
  exerciseList: ExerciseData[]
}

interface ScheduleData {
  start: number
  breakTime: number
  workoutTimes: number
  type: keyof typeof IScheduleType
  /** ExerciseData key */
  exerciseList?: ExerciseData[]
}

type Schedule = {
  id: number
  year: number
  month: number
  date: number
  beforeTime: number
} & ScheduleData

interface ScheduleStore {
  [date: string]: { [id: string]: Schedule }
}