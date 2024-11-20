import { Exercise } from "./exercise"

export declare namespace ExercisePreset {
  interface Preset {
    id: number
    name: string
    deps: number
  }
  interface PresetWithExerciseList extends Preset {
    exerciseList?: Exercise.Data[]
  }
}