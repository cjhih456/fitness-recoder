import type { FitnessStoreType } from '../model/types';
import FitnessData from '../model/FitnessData.json'
export const FitnessMockData: FitnessStoreType[] = FitnessData.map((v, i) => {
  const fitness = v as FitnessStoreType
  return {
    ...fitness,
    aliases: fitness.aliases || [],
    description: fitness.description || '',
    tips: fitness.tips || [],
    id: i + 1,
    __typename: 'Fitness'
  }
})
