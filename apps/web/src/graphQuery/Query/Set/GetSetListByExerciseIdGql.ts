import { gql } from '@apollo/client';

const GetSetListByExerciseIdGql = gql`
query GetSetListByExerciseId($id: Int!) {
  getSetListByExerciseId(id: $id) {
    ...SetsFragment
  }
}`

export default GetSetListByExerciseIdGql