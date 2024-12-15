import FitnessFragment from '@graphQuery/Fragment/FitnessFragment';
import useFixedFragment from '@hooks/apollo/useFixedFragment';
import { useLazyGetFitnessById } from '@service/GqlStore/Fitness';

export default function useFitnessFragment(id: number) {
  return useFixedFragment<FitnessStoreType, GetFitnessByIdResponse, GetFitnessByIdVariable>(
    FitnessFragment,
    useLazyGetFitnessById,
    {
      id,
      __typename: 'Fitness'
    })
}