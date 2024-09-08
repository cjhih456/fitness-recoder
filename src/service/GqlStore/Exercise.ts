import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';

const CreateExerciseGql = gql`
mutation CreateExercise ($exercise: CreateExerciseInput!) {
  createExercise(exercise: $exercise) {
    id
    exercise
  }
}
`
export function useCreateExercise() {
  return useMutation<{ createExercise: ExerciseData }, { exercise: { scheduleId: number, exerciseId: number } }>(CreateExerciseGql)
}


const GetExerciseListByScheduleIdGql = gql`
query GetExerciseListByScheduleId($scheduleId: ID) {
  getExerciseListByScheduleId(scheduleId: $scheduleId) {
    exercise
    id
  }
}
`
export function useGetExerciseListByScheduleId(scheduleId: number) {
  return useQuery<{ getExerciseListByScheduleId: ExerciseData[] }>(GetExerciseListByScheduleIdGql, {
    variables: { scheduleId: Number(scheduleId) }
  })
}
export function useLazyGetExerciseListByScheduleId() {
  return useLazyQuery<{ getExerciseListByScheduleId: ExerciseData[] }>(GetExerciseListByScheduleIdGql)
}


const DeleteExerciseByIdGql = gql`
mutation DeleteExerciseById($id: ID) {
  deleteExerciseById(id: $id)
}
`
export function useDeleteExerciseById() {
  return useMutation(DeleteExerciseByIdGql)
}