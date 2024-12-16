import { gql } from '@apollo/client';

const GetFitnessLisyByIds = gql`
query GetFitnessListByIds($ids: [Int!]) {
  getFitnessListByIds(ids: $ids) {
    ...FitnessFragment
  }
}`
export default GetFitnessLisyByIds