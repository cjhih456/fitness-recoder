import { useSuspenseFragment } from '@apollo/client';
import ExercisePresetWithListFragment from './graphql/fragments/ExercisePresetWithListFragment';

export default function useExercisePresetWithListFragment(id: number) {
  const { data } = useSuspenseFragment<ExercisePresetWithListStoreType>({
    fragment: ExercisePresetWithListFragment,
    from: {
      id,
      __typename: 'ExercisePresetWithList'
    }
  })
  return data
}
