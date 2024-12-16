import { gql } from '@apollo/client';

const GetFitnessSimpleByIds = gql`
query GetFitnessSimpleListByIds($ids: [Int!]) {
  getFitnessListByIds(ids: $ids) {
    ...FitnessSimpleFragment
  }
}`

export default GetFitnessSimpleByIds