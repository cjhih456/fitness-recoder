import Data from './FitnessData.json'
import { Category, Equipment, Force, Level, Mechanic, Muscle } from './FitnessDataEnums'
export const exercises = Data as IExercise[]

export const muscleList: { value: Muscle, text: string }[] = [
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
export const categoryList: { value: Category, text: string }[] = [
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


export function filterExcercises(name: string, category: Category[], force?: Force[], level?: Level[], muscle?: Muscle[], mechanic?: Mechanic[], equipment?: Equipment[]) {
  return exercises.filter((exer) => {
    if (name && exer.name.indexOf(name) === -1) return false
    if (category.length && !category.includes(exer.category as Category)) return false
    if (level && level.length && !level.includes(exer.level as Level)) return false
    if (force && force.length) {
      if (!(exer.force && !force.includes(exer.force as Force))) return false
    }
    if (muscle && muscle.length) {
      const temp = ([] as Muscle[]).concat(exer.primaryMuscles as Muscle[], exer.secondaryMuscles as Muscle[])
      let found = 0
      for (const m of muscle) {
        if (temp.includes(m)) {
          found++
        }
      }
      if (!found) return false
    }

    if (mechanic && mechanic.length) {
      if (exer.mechanic && !mechanic.includes(exer.mechanic as Mechanic)) return false
    }

    if (equipment && equipment.length) {
      if (exer.equipment && !equipment.includes(exer.equipment as Equipment)) return false
    }
    return true
  })
}