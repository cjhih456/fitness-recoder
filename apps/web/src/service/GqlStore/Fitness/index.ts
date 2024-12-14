import type { GetFitnessByIdResponse, GetFitnessByIdVariable } from './GetFitnessById';
import type { GetFitnessSimpleByIdResponse, GetFitnessSimpleByIdVariable } from './GetFitnessSimpleById';
import type { StoreObject } from '@apollo/client';
import type { Exercise } from 'fitness-struct';
import { gql } from '@apollo/client';
import useFixedFragment from '@hooks/apollo/useFixedFragment';
import FitnessData from '@service/Fitness/FitnessData.json'
import { useGetFitnessById, useLazyGetFitnessById } from './GetFitnessById'
import { useGetFitnessListByIds, useLazyGetFitnessListByIds } from './GetFitnessListByIds'
import { useGetFitnessListByKeywords } from './GetFitnessListByKeywords'
import { useGetFitnessSimpleById, useLazyGetFitnessSimpleById } from './GetFitnessSimpleById'
import { useGetFitnessSimpleListByIds, useBackgroundGetFitnessSimpleListByIds } from './GetFitnessSimpleListByIds'

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