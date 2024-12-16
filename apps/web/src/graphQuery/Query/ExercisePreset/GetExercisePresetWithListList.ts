import { gql } from '@apollo/client'

const GetExercisePresetWithListList = gql`
query GetExercisePresetWithListList($offset: Int, $size: Int) {
  getExercisePresetWithListList(offset: $offset, size: $size) {
    ...ExercisePresetWithListFragment
  }
}`
export default GetExercisePresetWithListList