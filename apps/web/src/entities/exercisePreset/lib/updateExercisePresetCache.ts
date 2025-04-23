import type { ExercisePresetStoreType } from '../model'
import type { ApolloCache, Reference } from '@apollo/client'
import type { AsStoreObject } from '@apollo/client/utilities'
import type { ExercisePreset } from '@fitness/struct'
import ExercisePresetFragment from '../api/fragments/ExercisePresetFragment'

export default function updateExercisePresetCache(
  id: number | Reference | AsStoreObject<ExercisePresetStoreType>,
  cache: ApolloCache<any>,
  update: (_exercisePresetData: ExercisePreset.Data) => ExercisePreset.Data
) {
  const currentId = typeof id === 'number' ? cache.identify({
    id,
    __typename: 'ExercisePreset'
  }) : cache.identify(id)
  cache.updateFragment<ExercisePreset.Data>({
    id: currentId,
    fragment: ExercisePresetFragment
  }, (exercisePresetData) => {
    if (!exercisePresetData) return exercisePresetData
    return update(exercisePresetData)
  })
}