import { gql, useMutation } from '@apollo/client';

const CreateExerciseGql = gql`
mutation CreateExercise ($exercise: CreateExerciseInput) {
  createExercise(exercise: $exercise) {
    id
    exercise
  }
}
`
export function useCreateExercise() {
  return useMutation(CreateExerciseGql)
}