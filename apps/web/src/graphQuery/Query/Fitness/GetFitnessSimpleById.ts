import { gql } from '@apollo/client'

const GetFitnessSimpleById = gql`
query GetFitnessSimpleById($id: Int) {
  getFitnessById(id: $id) {
    ...FitnessSimpleFragment
  }
}`

export default GetFitnessSimpleById