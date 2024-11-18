enum IScheduleType {
  BREAK = 'BREAK',
  SCHEDULED = 'SCHEDULED',
  STARTED = 'STARTED',
  PAUSED = 'PAUSED',
  FINISH = 'FINISH',
}

interface SetsCreateType {
  exerciseId: number
  repeat: number
  isDone: boolean
  weightUnit: keyof typeof WeightUnit
  weight?: number
  duration?: number
}

interface Sets extends SetsCreateType {
  id: number
}


interface ExerciseData {
  id: number
  /** IExercise.idx */
  exercise: number
  deps: number
}

interface ExerciseHistoryData {
  id: number,
  year: number,
  month: number,
  date: number,
  type: string,
  exercise: number,
  cnt: number,
  hasDone: number
  weights: string,
  repeats: string,
  weightUnit: string
}

interface ExercisePreset {
  id: number
  name: string
  deps: number
}
interface ExercisePresetWithExerciseList extends ExercisePreset {
  exerciseList?: ExerciseData[]
}

interface ScheduleData {
  start: number
  breakTime: number
  workoutTimes: number
  type: keyof typeof IScheduleType
  /** ExerciseData key */
  exerciseList?: ExerciseData[]
}

interface CreateSchedule extends ScheduleData {
  year: number
  month: number
  date: number
  beforeTime: number
}

interface Schedule extends CreateSchedule {
  id: number
}

interface ScheduleStore {
  [date: string]: { [id: string]: Schedule }
}