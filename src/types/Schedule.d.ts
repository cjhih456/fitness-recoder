enum ScheduleType {
  BREAK, FINISH, SCHEDULED, STARTED
}

interface Sets {
  repeat: number
  weightUnit: 'kg' | 'lbs'
  weight?: number
  time?: number
}

interface ExerciseData {
  exercise: Exercise,
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
  workoutTimes: number
  type: ScheduleType
  exerciseList: ExerciseData[]
}


interface ScheduleStore {
  [date: string]: Schedule[]
}