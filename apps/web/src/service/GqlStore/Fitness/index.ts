import { Exercise } from 'fitness-struct';
import FitnessData from '../../Fitness/FitnessData.json'
import { useGetFitnessById, useLazyGetFitnessById } from './GetFitnessById'
import { useGetFitnessListByIds, useLazyGetFitnessListByIds } from './GetFitnessListByIds'
import { useGetFitnessListByKeywords } from './GetFitnessListByKeywords'
import { useGetFitnessSimpleById, useLazyGetFitnessSimpleById } from './GetFitnessSimpleById'
import { useGetFitnessSimpleListByIds, useBackgroundGetFitnessSimpleListByIds } from './GetFitnessSimpleListByIds'
import { gql, StoreObject } from '@apollo/client';

export type FitnessStoreType = Exercise.IFitness & StoreObject
export const FitnessSimpleFragment = gql`
fragment FitnessSimpleFragment on Fitness {
  id
  name
  aliases
  primaryMuscles
  secondaryMuscles
  category
}`
export const FitnessFragment = gql`
fragment FitnessFragment on Fitness {
  ...FitnessSimpleFragment
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