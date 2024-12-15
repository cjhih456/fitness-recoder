import { gql } from '@apollo/client';
import FitnessData from '@service/Fitness/FitnessData.json'
import { useGetFitnessById, useLazyGetFitnessById } from './GetFitnessById'
import { useGetFitnessListByIds, useLazyGetFitnessListByIds } from './GetFitnessListByIds'
import { useGetFitnessListByKeywords } from './GetFitnessListByKeywords'
import { useGetFitnessSimpleById, useLazyGetFitnessSimpleById } from './GetFitnessSimpleById'
import { useGetFitnessSimpleListByIds, useBackgroundGetFitnessSimpleListByIds } from './GetFitnessSimpleListByIds'

export const FitnessDetailFragment = gql`
fragment FitnessDetailFragment on Fitness {
  id
  force
  level
  mechanic
  equipment
  instructions
  description
  tips
}`

export {
  useGetFitnessById,
  useLazyGetFitnessById,
  useGetFitnessListByIds,
  useLazyGetFitnessListByIds,
  useGetFitnessListByKeywords,
  useGetFitnessSimpleById,
  useLazyGetFitnessSimpleById,
  useGetFitnessSimpleListByIds,
  useBackgroundGetFitnessSimpleListByIds,
}

export const FitnessMockData: FitnessStoreType[] = FitnessData.map((v, i) => {
  const fitness = v as FitnessStoreType
  return {
    ...fitness,
    aliases: fitness.aliases || [],
    description: fitness.description || '',
    tips: fitness.tips || [],
    id: i + 1
  }
})