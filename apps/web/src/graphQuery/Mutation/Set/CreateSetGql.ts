import { gql } from '@apollo/client';

const CreateSetGql = gql`
mutation createSetByExercise($sets: CreateSetsInput!) {
  createSet(sets: $sets) {
    ...SetsFragment
  }
}`
export default CreateSetGql