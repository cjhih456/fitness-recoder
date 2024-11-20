export declare namespace Exercise {
  type IMuscle = "abdominals" |
    "hamstrings" |
    "calves" |
    "shoulders" |
    "adductors" |
    "glutes" |
    "quadriceps" |
    "biceps" |
    "forearms" |
    "abductors" |
    "triceps" |
    "chest" |
    "lower back" |
    "traps" |
    "middle back" |
    "lats" |
    "neck"

  type IForce = "pull" |
    "push" |
    "static"

  type ILevel = 'beginner' |
    'intermediate' |
    'expert'

  type IMechanic = 'compound' |
    'isolation'

  type IEquipment = 'body only' |
    'machine' |
    'kettlebells' |
    'dumbbell' |
    'cable' |
    'barbell' |
    'bands' |
    'medicine ball' |
    'exercise ball' |
    'e-z curl bar' |
    'foam roll'

  type ICategory = 'strength' |
    'stretching' |
    'plyometrics' |
    'strongman' |
    'powerlifting' |
    'cardio' |
    'olympic weightlifting' |
    'crossfit' |
    'weighted bodyweight' |
    'assisted bodyweight'
  interface IExercise {
    idx: number
    name: string;
    aliases?: string[];
    primaryMuscles: IMuscle[];
    secondaryMuscles: IMuscle[];
    force?: IForce;
    level: ILevel;
    mechanic?: IMechanic;
    equipment?: IEquipment;
    category: ICategory;
    instructions: string[];
    description?: string;
    tips?: string[];
  }
  type SelectedExercise = IExercise & { selected: boolean }

  interface Data {
    id: number
    /** IExercise.idx */
    exercise: number
    deps: number
  }

  interface HistoryData {
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
}

