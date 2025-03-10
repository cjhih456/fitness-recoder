import { gql } from '@apollo/client'

const UpdateSetGql = gql`
mutation updateSet($sets: UpdateSetsInput!) {
  updateSet(sets: $sets) {
    ...SetsFragment
  }
}`
export default UpdateSetGql