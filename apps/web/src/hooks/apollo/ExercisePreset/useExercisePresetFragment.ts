import { useSuspenseFragment } from '@apollo/client';
import { useGetExercisePresetById } from '@hooks/apollo/ExercisePreset';
import ExercisePresetFragment from './graphql/fragments/ExercisePresetFragment';

export default function useExercisePresetFragment(id: number) {
  useGetExercisePresetById(id)
  const { data } = useSuspenseFragment<ExercisePresetStoreType>({
    fragment: ExercisePresetFragment,
    from: {
      id,
      __typename: 'ExercisePreset'
    }
  })
  return data
}