import { gql } from '@apollo/client'

const ExerciseWithFitnessFragment = gql`
fragment ExerciseWithFitnessFragment on ExerciseWithFitness {
  ...ExerciseFragment
  fitness {
    ...FitnessFragment
  }
}`
export default ExerciseWithFitnessFragment