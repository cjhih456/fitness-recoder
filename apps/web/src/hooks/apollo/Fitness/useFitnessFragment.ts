import FitnessFragment from '@graphQuery/Fragment/FitnessFragment';
import { useLazyGetFitnessById } from '@hooks/apollo/Fitness';
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