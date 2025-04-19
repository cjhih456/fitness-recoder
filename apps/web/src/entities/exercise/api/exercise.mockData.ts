import type { ExerciseDataStoreType } from '../model'
import { FitnessMockData } from '@entities/fitness/api/fitness.mockData'

export const ExerciseMockData: { [key: number]: ExerciseDataStoreType } = Array(20).fill(0).reduce((acc, _cur, i) => {
  const id = i + 1
  const temp: ExerciseDataStoreType = {
    id,
    deps: 0,
    fitness: FitnessMockData[i],
    fitnessId: FitnessMockData[i].id,
    __typename: 'ExerciseWithFitness'
  }
  acc[id] = temp
  return acc
}, {})
