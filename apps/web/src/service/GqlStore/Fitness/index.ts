import { Exercise } from 'fitness-struct';
import FitnessData from '../../Fitness/FitnessData.json'
import { GetFitnessByIdResponse, GetFitnessByIdVariable, useGetFitnessById, useLazyGetFitnessById } from './GetFitnessById'
import { useGetFitnessListByIds, useLazyGetFitnessListByIds } from './GetFitnessListByIds'
import { useGetFitnessListByKeywords } from './GetFitnessListByKeywords'
import { GetFitnessSimpleByIdResponse, GetFitnessSimpleByIdVariable, useGetFitnessSimpleById, useLazyGetFitnessSimpleById } from './GetFitnessSimpleById'
import { useGetFitnessSimpleListByIds, useBackgroundGetFitnessSimpleListByIds } from './GetFitnessSimpleListByIds'
import { gql, StoreObject } from '@apollo/client';
import useFixedFragment from '../useFixedFragment';

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
export const FitnessFragment = gql`
fragment FitnessFragment on Fitness {
  id
  name
  aliases
  primaryMuscles
  secondaryMuscles
  category
  force
  level
  mechanic
  equipment
  instructions
  description
  tips
}`


export function useFitnessSimpleFragment(id: number) {
  return useFixedFragment<FitnessStoreType, GetFitnessSimpleByIdResponse, GetFitnessSimpleByIdVariable>(
    FitnessSimpleFragment,
    useLazyGetFitnessSimpleById,
    {
      id,
      __typename: 'Fitness'
    })
}
export function useFitnessFragment(id: number) {
  return useFixedFragment<FitnessStoreType, GetFitnessByIdResponse, GetFitnessByIdVariable>(
    FitnessFragment,
    useLazyGetFitnessById,
    {
      id,
      __typename: 'Fitness'
    })
}

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