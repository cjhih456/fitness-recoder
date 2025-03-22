import { useSuspenseFragment } from '@apollo/client';
import { useGetExercisePresetWithListById } from '@hooks/apollo/ExercisePreset';
import ExercisePresetWithListFragment from './graphql/fragments/ExercisePresetWithListFragment';

export default function useExercisePresetWithListFragment(id: number) {
  useGetExercisePresetWithListById(id)
  const { data } = useSuspenseFragment<ExercisePresetWithListStoreType>({
    fragment: ExercisePresetWithListFragment,
    from: {
      id,
      __typename: 'ExercisePresetWithList'
    }
  })
  return data
}
