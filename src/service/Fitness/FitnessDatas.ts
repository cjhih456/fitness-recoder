import Data from './FitnessData.json'
import { Category, Equipment, Force, Level, Mechanic, Muscle } from './FitnessDataEnums'
export const exercises = Data as IExercise[]


export function filterExcercises(name: string, category: Category[], force?: Force[], level?: Level[], muscle?: Muscle[], mechanic?: Mechanic[], equipment?: Equipment[]) {
  return exercises.filter((exer) => {
    console.log(name, exer.name.indexOf(name))
    if (name && exer.name.indexOf(name) === -1) return false
    if (category.length && category.includes(exer.category as Category)) return false
    if (level && level.length && level.includes(exer.level as Level)) return false
    if (force && force.length) {
      if (!(exer.force && force.includes(exer.force as Force))) return false
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
      if (!exer.mechanic) return false
      if (!mechanic.includes(exer.mechanic as Mechanic)) return false
    }

    if (equipment && equipment.length) {
      if (!exer.equipment) return false
      if (!equipment.includes(exer.equipment as Equipment)) return false
    }
    return true
  })
}