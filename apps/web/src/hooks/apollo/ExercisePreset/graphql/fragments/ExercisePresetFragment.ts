import { gql } from '@apollo/client'

const ExercisePresetFragment = gql`
fragment ExercisePresetFragment on ExercisePreset {
  id
  name
}`

export default ExercisePresetFragment