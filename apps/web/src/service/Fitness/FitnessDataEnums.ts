import { enumify } from '@shared/lib/utils'

export const Muscle = enumify({
  abdominals: 'abdominals',
  hamstrings: 'hamstrings',
  calves: 'calves',
  shoulders: 'shoulders',
  adductors: 'adductors',
  glutes: 'glutes',
  quadriceps: 'quadriceps',
  biceps: 'biceps',
  forearms: 'forearms',
  abductors: 'abductors',
  triceps: 'triceps',
  chest: 'chest',
  lower_back: 'lower_back',
  traps: 'traps',
  middle_back: 'middle_back',
  lats: 'lats',
  neck: 'neck',
})

export const Category = enumify({
  strength: 'strength',
  stretching: 'stretching',
  plyometrics: 'plyometrics',
  strongman: 'strongman',
  powerlifting: 'powerlifting',
  cardio: 'cardio',
  olympic_weightlifting: 'olympic_weightlifting',
  crossfit: 'crossfit',
  weighted_bodyweight: 'weighted_bodyweight',
  assisted_bodyweight: 'assisted_bodyweight',
})

export const Force = enumify({
  pull: 'pull',
  push: 'push',
  static: 'static',
})

export const Level = enumify({
  beginner: 'beginner',
  intermediate: 'intermediate',
  expert: 'expert',
})

export const Mechanic = enumify({
  compound: 'compound',
  isolation: 'isolation',
})

export const Equipment = enumify({
  body_only: 'body only',
  machine: 'machine',
  kettlebells: 'kettlebells',
  dumbbell: 'dumbbell',
  cable: 'cable',
  barbell: 'barbell',
  bands: 'bands',
  medicine_ball: 'medicine ball',
  exercise_ball: 'exercise ball',
  e_z_curl_bar: 'e-z curl bar',
  foam_roll: 'foam roll',
})
