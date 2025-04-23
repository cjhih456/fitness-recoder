import { gql } from '@apollo/client'

const GetExercisePresetWithListById = gql`
query GetExercisePresetWithListById($id: Int) {
  getExercisePresetWithListById(id: $id) {
    ...ExercisePresetWithListFragment
  }
}`
export default GetExercisePresetWithListById