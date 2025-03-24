import { gql } from '@apollo/client';

const GetFitnessListByKeywords = gql`
query getFitnessListByKeywords($name: String, $category: [ICategory], $muscle: [IMuscle], $limit: Int, $offset: Int) {
  getFitnessListByKeywords(name: $name, category: $category, muscle: $muscle, limit: $limit, offset: $offset) {
    ...FitnessFragment
  }
}`

export default GetFitnessListByKeywords