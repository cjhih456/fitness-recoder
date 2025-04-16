import type { Exercise } from 'fitness-struct'
import { getFitnessById, getFitnessByIds } from '../Fitness/service'
import { cloneListByExerciseId } from '../Sets/service'
import { createExerciseByIds } from './repository'

export const loadFitnessByExercise: ResponseBuilder<{ exercise: Exercise.Data }, Exercise.Data> = async (
  dbBus,
  { client },
  { exercise }
) => {
  const fitness = await getFitnessById(dbBus, { client }, { id: exercise.fitnessId })
  return Object.assign(exercise, {
    fitness: fitness
  })
}

export const loadFitnessByExerciseList: ResponseBuilder<{ exerciseList: Exercise.Data[] }, Exercise.Data[]> = async (
  dbBus,
  { client },
  { exerciseList }
) => {
  const fitnessList = await getFitnessByIds(dbBus, { client }, { ids: exerciseList.map(v => v.fitnessId) })
  return exerciseList.map(v => ({
    ...v,
    fitness: fitnessList?.find(f => f.id === v.fitnessId)
  }))
}

export const cloneExerciseList: ResponseBuilder<{ exerciseList: Exercise.Data[] }, Exercise.Data[]> = async (
  dbBus,
  { client },
  { exerciseList }
) => {
  const newExerciseList = await createExerciseByIds(dbBus, { client }, { fitnessIds: exerciseList.map(v => v.fitnessId) })
  return await Promise.all(newExerciseList.map(async (newExercise, idx) => {
    await cloneListByExerciseId(dbBus, { client }, { exerciseId: exerciseList[idx].id, newExerciseId: newExercise.id })
    return newExercise
  }))
}
