import { gql } from '@apollo/client'

const ExerciseWithFitnessFragment = gql`
fragment ExerciseWithFitnessFragment on ExerciseWithFitness {
  id
  deps
  fitnessId
  fitness {
    ...FitnessFragment
  }
}`
export default ExerciseWithFitnessFragment