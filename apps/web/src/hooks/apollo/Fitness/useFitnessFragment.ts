import { useSuspenseFragment } from '@apollo/client';
import FitnessFragment from '@hooks/apollo/Fitness/graphql/fragment/FitnessFragment';
import useGetFitnessById from './useGetFitnessById';

export default function useFitnessFragment(id: number) {
  useGetFitnessById(id)
  const { data } = useSuspenseFragment<FitnessStoreType>({
    fragment: FitnessFragment,
    from: {
      id,
      __typename: 'Fitness'
    }
  })
  return data
}