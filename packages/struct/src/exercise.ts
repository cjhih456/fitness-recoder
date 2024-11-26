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
    "lower_back" |
    "traps" |
    "middle_back" |
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

  type IEquipment = 'body_only' |
    'machine' |
    'kettlebells' |
    'dumbbell' |
    'cable' |
    'barbell' |
    'bands' |
    'medicine_ball' |
    'exercise_ball' |
    'e-z_curl_bar' |
    'foam_roll' |
    'other'

  type ICategory = 'strength' |
    'stretching' |
    'plyometrics' |
    'strongman' |
    'powerlifting' |
    'cardio' |
    'olympic_weightlifting' |
    'crossfit' |
    'weighted_bodyweight' |
    'assisted_bodyweight'
  interface IFitness {
    id: number
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
  type IFitnessDB = IFitness & {
    aliases: string
    primaryMuscles: string
    secondaryMuscles: string
    instructions: string
    tips: string
  }
  type SelectedExercise = IFitness & { selected: boolean }

  interface Data {
    id: number
    /** IFitness.idx */
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

