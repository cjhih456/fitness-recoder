import type { Exercise } from '@fitness/struct';
import { Category, Muscle } from './FitnessDataEnums'

export const muscleList: { value: Exercise.IMuscle, text: string }[] = [
  { value: Muscle.abdominals, text: 'Abdominals' },
  { value: Muscle.hamstrings, text: 'Hamstrings' },
  { value: Muscle.calves, text: 'Calves' },
  { value: Muscle.shoulders, text: 'Shoulders' },
  { value: Muscle.adductors, text: 'Adductors' },
  { value: Muscle.glutes, text: 'Glutes' },
  { value: Muscle.quadriceps, text: 'Quadriceps' },
  { value: Muscle.biceps, text: 'Biceps' },
  { value: Muscle.forearms, text: 'Forearms' },
  { value: Muscle.abductors, text: 'Abductors' },
  { value: Muscle.triceps, text: 'Triceps' },
  { value: Muscle.chest, text: 'Chest' },
  { value: Muscle.lower_back, text: 'Lower Back' },
  { value: Muscle.traps, text: 'Traps' },
  { value: Muscle.middle_back, text: 'Middle Back' },
  { value: Muscle.lats, text: 'Lats' },
  { value: Muscle.neck, text: 'Neck' },
]
export const categoryList: { value: Exercise.ICategory, text: string }[] = [
  { value: Category.strength, text: 'Strength' },
  { value: Category.stretching, text: 'Stretching' },
  { value: Category.plyometrics, text: 'Plyometrics' },
  { value: Category.strongman, text: 'Strongman' },
  { value: Category.powerlifting, text: 'Powerlifting' },
  { value: Category.cardio, text: 'Cardio' },
  { value: Category.olympic_weightlifting, text: 'Olympic Weightlifting' },
  { value: Category.crossfit, text: 'Crossfit' },
  { value: Category.weighted_bodyweight, text: 'Weighted Bodyweight' },
  { value: Category.assisted_bodyweight, text: 'Assisted Bodyweight' },
]
