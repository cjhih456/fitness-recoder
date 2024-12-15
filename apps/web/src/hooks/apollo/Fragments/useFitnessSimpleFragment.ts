import FitnessSimpleFragment from '@graphQuery/Fragment/FitnessSimpleFragment';
import useFixedFragment from '@hooks/apollo/useFixedFragment';
import { useLazyGetFitnessSimpleById } from '@service/GqlStore/Fitness';

export default function useFitnessSimpleFragment(id: number) {
  return useFixedFragment<FitnessStoreType, GetFitnessSimpleByIdResponse, GetFitnessSimpleByIdVariable>(
    FitnessSimpleFragment,
    useLazyGetFitnessSimpleById,
    {
      id,
      __typename: 'Fitness'
    })
}