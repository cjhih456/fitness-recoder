import { useSuspenseFragment } from '@apollo/client';
import FitnessFragment from './graphql/fragment/FitnessFragment';

export default function useFitnessFragment(id: number) {
  const { data } = useSuspenseFragment<FitnessStoreType>({
    fragment: FitnessFragment,
    from: {
      id,
      __typename: 'Fitness'
    }
  })
  return data
}