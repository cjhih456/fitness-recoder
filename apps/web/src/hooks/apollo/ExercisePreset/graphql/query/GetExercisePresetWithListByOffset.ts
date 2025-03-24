import { gql } from '@apollo/client'

const GetExercisePresetWithListByOffset = gql`
query getExercisePresetWithListByOffset($offset: Int, $size: Int) {
  getExercisePresetWithListByOffset(offset: $offset, size: $size) {
    ...ExercisePresetWithListFragment
  }
}`
export default GetExercisePresetWithListByOffset