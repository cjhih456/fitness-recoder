import FitnessData from '@service/Fitness/FitnessData.json'
import useFitnessFragment from './useFitnessFragment'
import useFitnessSimpleFragment from './useFitnessSimpleFragment'
import useGetFitnessById from './useGetFitnessById'
import useGetFitnessListByIds from './useGetFitnessListByIds'
import useGetFitnessListByKeywords from './useGetFitnessListByKeywords'
import useGetFitnessSimpleById from './useGetFitnessSimpleById'
import useGetFitnessSimpleListByIds from './useGetFitnessSimpleListByIds'

export {
  useFitnessFragment,
  useFitnessSimpleFragment,
  useGetFitnessById,
  useGetFitnessListByIds,
  useGetFitnessListByKeywords,
  useGetFitnessSimpleById,
  useGetFitnessSimpleListByIds
}

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