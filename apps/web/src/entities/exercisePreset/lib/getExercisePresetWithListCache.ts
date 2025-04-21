import type { ExercisePresetWithListStoreType } from '../model';
import type { ApolloCache, Reference } from '@apollo/client';
import type { AsStoreObject } from '@apollo/client/utilities';
import ExercisePresetWithListFragment from '../api/fragments/ExercisePresetWithListFragment';

export default function getExercisePresetWithListCache(id: number | Reference | AsStoreObject<ExercisePresetWithListStoreType>, cache: ApolloCache<any>) {
  const currentId = typeof id === 'number' ? cache.identify({
    id,
    __typename: 'ExercisePresetWithList'
  }) : cache.identify(id)
  return cache.readFragment<ExercisePresetWithListStoreType>({
    id: currentId,
    fragment: ExercisePresetWithListFragment
  })
}