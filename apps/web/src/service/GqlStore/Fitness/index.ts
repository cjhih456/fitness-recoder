import { Exercise } from 'fitness-struct';
import FitnessData from '../../Fitness/FitnessData.json'
import { useGetFitnessById, useLazyGetFitnessById } from './GetFitnessById'
import { useGetFitnessListByIds, useLazyGetFitnessListByIds } from './GetFitnessListByIds'
import { useGetFitnessListByKeywords, useLazyGetFitnessListByKeywords } from './GetFitnessListByKeywords'
import { gql } from '@apollo/client';

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