import type { FitnessStoreType } from '../model/types';
import { useSuspenseFragment } from '@apollo/client';
import FitnessSimpleFragment from './fragment/FitnessSimpleFragment';

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
