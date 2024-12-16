import { gql } from '@apollo/client'

const FitnessSimpleFragment = gql`
fragment FitnessSimpleFragment on Fitness {
  id
  name
  aliases
  primaryMuscles
  secondaryMuscles
  category
}`
export default FitnessSimpleFragment