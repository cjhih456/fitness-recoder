import type { ExerciseDataStoreType } from '../model';
import type { ApolloCache, Reference } from '@apollo/client';
import type { AsStoreObject } from '@apollo/client/utilities';
import ExerciseWithFitnessFragment from '../api/fragment/ExerciseWithFitnessFragment';

export default function getExerciseCache(id: number | Reference | AsStoreObject<ExerciseDataStoreType>, cache: ApolloCache<any>) {
  const currentId = typeof id === 'number' ? cache.identify({
    id,
    __typename: 'ExerciseWithFitness'
  }) : cache.identify(id)
  return cache.readFragment<ExerciseDataStoreType>({
    id: currentId,
    fragment: ExerciseWithFitnessFragment
  })
}