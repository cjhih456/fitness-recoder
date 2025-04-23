import type { ExercisePresetWithListStoreType } from '../model';
import type { ApolloCache, Reference } from '@apollo/client';
import type { AsStoreObject } from '@apollo/client/utilities';
import type { ExercisePreset } from '@fitness/struct';
import ExercisePresetWithListFragment from '../api/fragments/ExercisePresetWithListFragment';

export default function updateExercisePresetWithListCache(
  id: number | Reference | AsStoreObject<ExercisePresetWithListStoreType>,
  cache: ApolloCache<any>,
  update: (_exercisePresetData: ExercisePreset.WithExerciseList) => ExercisePreset.WithExerciseList
) {
  const currentId = typeof id === 'number' ? cache.identify({
    id,
    __typename: 'ExercisePresetWithList'
  }) : cache.identify(id)
  cache.updateFragment<ExercisePreset.WithExerciseList>({
    id: currentId,
    fragment: ExercisePresetWithListFragment
  }, (exercisePresetData) => {
    if (!exercisePresetData) return exercisePresetData
    return update(exercisePresetData)
  })
}