import { gql } from '@apollo/client';

const GetExercisePresetById = gql`
query GetExercisePresetById($id: Int!) {
  getExercisePresetById(id:$id) {
    ...ExercisePresetFragment
  }
}`
export default GetExercisePresetById