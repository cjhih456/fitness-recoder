import { gql } from '@apollo/client'

const ExerciseFragment = gql`
fragment ExerciseFragment on BaseExercise {
  id
  deps
  exercise
}`

const ExerciseWithFitnessFragment = gql`
fragment ExerciseWithFitnessFragment on ExerciseWithFitness {
  ...ExerciseFragment
  fitness {
    ...FitnessFragment
  }
}`

export {
  ExerciseFragment,
  ExerciseWithFitnessFragment
}