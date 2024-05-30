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
  weightUnit: WeightUnit
  weight?: number
  duration?: number
}

interface ExerciseData {
  /** IExercise.idx */
  exercise: number
  /** Set store idx */
  sets: string[]
}

interface ExercisePreset {
  id: string
  name: string
  /** ExerciseData key */
  exerciseList: string[]
}

interface ScheduleData {
  start: number
  breakTime: number
  workoutTimes: number
  type: keyof typeof IScheduleType
  /** ExerciseData key */
  exerciseList: string[]
}

type Schedule = {
  id: string
  year: number
  month: number
  date: number
  beforeTime: number
} & ScheduleData

interface ScheduleStore {
  [date: string]: { [id: string]: Schedule }
}