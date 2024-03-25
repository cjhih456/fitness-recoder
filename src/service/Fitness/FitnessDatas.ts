import { Category, Equipment, Exercise, Force, Level, Mechanic, Muscle } from "./exercise";
import Data from './FitnessData.json'
export const exercises = Data as Exercise[]

export function filterExcercises(category: Category[], force?: Force[], level?: Level[], muscle?: Muscle[], mechanic?: Mechanic[], equipment?: Equipment[]) {
  return exercises.filter((exer) => {
    if (!category.includes(exer.category)) return false
    if (!(level && level.includes(exer.level))) return false
    if (force && force.length) {
      if (!(exer.force && force.includes(exer.force))) return false
    }
    if(muscle && muscle.length) {
      const temp = ([] as Muscle[]).concat(exer.primaryMuscles, exer.secondaryMuscles)
      let found = 0
      for(let m of muscle) {
        if (temp.includes(m)) {
          found++
        }
      }
      if(!found) return false
    }

    if(mechanic && mechanic.length) {
      if (!exer.mechanic) return false
      if (!mechanic.includes(exer.mechanic)) return false
    }

    if (equipment && equipment.length) {
      if (!exer.equipment) return false
      if (!equipment.includes(exer.equipment)) return false
    }
    return true
  })
}