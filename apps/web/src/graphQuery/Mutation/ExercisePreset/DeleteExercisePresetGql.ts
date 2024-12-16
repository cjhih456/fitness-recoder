import { gql } from '@apollo/client'

const DeleteExercisePresetGql = gql`
mutation DeleteExercisePreset($id: Int!) {
  deleteExercisePreset(id: $id)
}
`
export default DeleteExercisePresetGql