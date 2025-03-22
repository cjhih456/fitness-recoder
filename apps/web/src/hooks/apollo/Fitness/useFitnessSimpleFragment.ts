import { useSuspenseFragment } from '@apollo/client';
import FitnessSimpleFragment from '@hooks/apollo/Fitness/graphql/fragment/FitnessSimpleFragment';
import useGetFitnessSimpleById from './useGetFitnessSimpleById';

export default function useFitnessSimpleFragment(id: number) {
  useGetFitnessSimpleById(id)
  const { data } = useSuspenseFragment<FitnessStoreType>({
    fragment: FitnessSimpleFragment,
    from: {
      id,
      __typename: 'Fitness'
    }
  })
  return data
}
