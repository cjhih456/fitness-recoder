import { gql } from '@apollo/client';

const GetFitnessById = gql`
query GetFitnessById($id: Int) {
  getFitnessById(id: $id) {
    ...FitnessFragment
  }
}`

export default GetFitnessById