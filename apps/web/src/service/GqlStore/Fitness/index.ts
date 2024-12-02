import { Exercise } from 'fitness-struct';
import FitnessData from '../../Fitness/FitnessData.json'
import { useGetFitnessById, useLazyGetFitnessById } from './GetFitnessById'
import { useGetFitnessListByIds, useLazyGetFitnessListByIds } from './GetFitnessListByIds'
import { useGetFitnessListByKeywords, useLazyGetFitnessListByKeywords } from './GetFitnessListByKeywords'

export {
  useGetFitnessById,
  useLazyGetFitnessById,
  useGetFitnessListByIds,
  useLazyGetFitnessListByIds,
  useGetFitnessListByKeywords,
  useLazyGetFitnessListByKeywords,
}

export const FitnessMockData: Exercise.IFitness[] = FitnessData.map((v, i) => {
  const fitness = v as Exercise.IFitness
  return {
    ...fitness,
    aliases: fitness.aliases || [],
    description: fitness.description || '',
    tips: fitness.tips || [],
    id: i + 1
  }
})