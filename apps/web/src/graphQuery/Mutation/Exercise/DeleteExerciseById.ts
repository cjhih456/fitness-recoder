import { gql } from '@apollo/client';

const DeleteExerciseById = gql`
mutation DeleteExerciseById($id: Int) {
  deleteExerciseById(id: $id)
}`

export default DeleteExerciseById