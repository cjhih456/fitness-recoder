import { useSuspenseFragment } from '@apollo/client';
import FitnessSimpleFragment from './graphql/fragment/FitnessSimpleFragment';

export default function useFitnessSimpleFragment(id: number) {
  const { data } = useSuspenseFragment<FitnessStoreType>({
    fragment: FitnessSimpleFragment,
    from: {
      id,
      __typename: 'Fitness'
    }
  })
  return data
}
