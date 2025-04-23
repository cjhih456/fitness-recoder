import { gql } from '@apollo/client'
const FitnessFragment = gql`
fragment FitnessFragment on Fitness {
  id
  name
  aliases
  primaryMuscles
  secondaryMuscles
  category
  force
  level
  mechanic
  equipment
  instructions
  description
  tips
}`

export default FitnessFragment