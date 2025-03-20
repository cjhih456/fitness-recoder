import { useLazyGetFitnessById } from '@hooks/apollo/Fitness';
import FitnessFragment from '@hooks/apollo/Fitness/graphql/fragment/FitnessFragment';
import useFixedFragment from '@hooks/apollo/useFixedFragment';

export default function useFitnessFragment(id: number) {
  return useFixedFragment<FitnessStoreType, GetFitnessByIdResponse, GetFitnessByIdVariable>(
    FitnessFragment,
    useLazyGetFitnessById,
    {
      id,
      __typename: 'Fitness'
    })
}