import FitnessSimpleFragment from '@hooks/apollo/Fitness/graphql/fragment/FitnessSimpleFragment';
import { useLazyGetFitnessSimpleById } from '@hooks/apollo/Fitness';
import useFixedFragment from '@hooks/apollo/useFixedFragment';

export default function useFitnessSimpleFragment(id: number) {
  return useFixedFragment<FitnessStoreType, GetFitnessSimpleByIdResponse, GetFitnessSimpleByIdVariable>(
    FitnessSimpleFragment,
    useLazyGetFitnessSimpleById,
    {
      id,
      __typename: 'Fitness'
    })
}