import { gql } from '@apollo/client'

const ExercisePresetWithListFragment = gql`
fragment ExercisePresetWithListFragment on ExercisePresetWithList {
  id
  name
  ...ExercisePresetFragment
  exerciseList {
    ...ExerciseWithFitnessFragment
  }
}`
export default ExercisePresetWithListFragment