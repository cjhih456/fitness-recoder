import type { ExercisePresetStoreType } from '../model';
import type { ApolloCache, Reference } from '@apollo/client';
import type { AsStoreObject } from '@apollo/client/utilities';
import ExercisePresetFragment from '../api/fragments/ExercisePresetFragment';

export default function getExercisePresetCache(id: number | Reference | AsStoreObject<ExercisePresetStoreType>, cache: ApolloCache<any>) {
  const currentId = typeof id === 'number' ? cache.identify({
    id,
    __typename: 'ExercisePreset'
  }) : cache.identify(id)
  return cache.readFragment<ExercisePresetStoreType>({
    id: currentId,
    fragment: ExercisePresetFragment
  })
}