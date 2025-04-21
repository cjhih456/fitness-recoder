import type { Exercise, Fitness } from '@fitness/struct';
import { useSuspenseFragment } from '@apollo/client';
import ExerciseWithFitnessFragment from './fragment/ExerciseWithFitnessFragment';

export default function useExerciseWithFitnessFragment(id: number) {
  const { data } = useSuspenseFragment<Exercise.Data & { fitness: Fitness.IFitness }>({
    from: {
      id: id,
      __typename: 'ExerciseWithFitness'
    },
    fragment: ExerciseWithFitnessFragment
  })
  return data
}
