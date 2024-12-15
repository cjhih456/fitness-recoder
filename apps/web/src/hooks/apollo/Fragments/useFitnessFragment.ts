import { gql } from '@apollo/client';
import useFixedFragment from '@hooks/apollo/useFixedFragment';
import { useLazyGetFitnessById } from '@service/GqlStore/Fitness';

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

export default function useFitnessFragment(id: number) {
  return useFixedFragment<FitnessStoreType, GetFitnessByIdResponse, GetFitnessByIdVariable>(
    FitnessFragment,
    useLazyGetFitnessById,
    {
      id,
      __typename: 'Fitness'
    })
}