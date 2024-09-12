import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';

const CreateExerciseByScheduleGql = gql`
mutation CreateExerciseBySchedule ($exercise: CreateExerciseByScheduleInput!) {
  createExerciseBySchedule(exercise: $exercise) {
    id
    exercise
  }
}
`
export function useCreateExerciseBySchedule() {
  return useMutation<{
    createExerciseBySchedule: ExerciseData
  }, {
    exercise: { scheduleId: number, exerciseId: number[] }
  }>(CreateExerciseByScheduleGql)
}

const UpdateExerciseListByScheduleIdGql = gql`
mutation UpdateExerciseListByScheduleId($scheduleId: Int, $newExercise: [Int!], $deleteExercise: [Int!]) {
  updateExerciseListByScheduleId(scheduleId: $scheduleId, newExercise: $newExercise, deleteExercise: $deleteExercise){
    id
    deps
    exercise
  }
}`
export function useUpdateExerciseListByScheduleId() {
  return useMutation<{
    updateExerciseListByScheduleId: ExerciseData
  }, {
    scheduleId: number,
    newExercise: number[],
    deleteExercise: number[]
  }>(UpdateExerciseListByScheduleIdGql)
}

const CreateExerciseByExercisePreset = gql`
mutation CreateExerciseByExercisePreset($exercise: CreateExerciseByExercisePresetInput!) {
  createExerciseByExercisePreset(exercise: $exercise) {
    id
    exercise
  }
}`
export function useCreateExerciseByExercisePreset() {
  return useMutation<
    { createExerciseByExercisePreset: ExerciseData },
    { exercise: { exercisePreset: number, exerciseId: number[] } }
  >(CreateExerciseByExercisePreset)
}

const updateExerciseListByExercisePresetIdGql = gql`
mutation UpdateExerciseListByExercisePresetId($exercisePresetId: Int, $newExercise: [Int!], $deleteExercise: [Int!]) {
  updateExerciseListByExercisePresetId(exercisePresetId: $exercisePresetId, newExercise: $newExercise, deleteExercise: $deleteExercise) {
    id
    deps
    exercise
  }
}`
export function useUpdateExerciseListByExercisePresetId() {
  return useMutation<{
    updateExerciseListByExercisePresetId: ExerciseData[]
  }, {
    exercisePresetId: number,
    newExercise: number,
    deleteExercise: number
  }>(updateExerciseListByExercisePresetIdGql)
}

const GetExerciseListByScheduleIdGql = gql`
query GetExerciseListByScheduleId($scheduleId: ID) {
  getExerciseListByScheduleId(scheduleId: $scheduleId) {
    id
    exercise
  }
}
`
export function useGetExerciseListByScheduleId(scheduleId: number) {
  return useQuery<{ getExerciseListByScheduleId: ExerciseData[] }, { scheduleId: number }>(GetExerciseListByScheduleIdGql, {
    variables: { scheduleId: Number(scheduleId) }
  })
}
export function useLazyGetExerciseListByScheduleId() {
  return useLazyQuery<{ getExerciseListByScheduleId: ExerciseData[] }, { scheduleId: number }>(GetExerciseListByScheduleIdGql)
}


const GetExerciseListByExercisePresetIdGql = gql`
query GetExerciseByExercisePresetId($id: ID) {
  getExerciseByExercisePresetId(id: $id) {
    id
    exercise
  }
}`
export function useGetExerciseListByExercisePresetId(exercisePresetId: number) {
  return useQuery<{ getExerciseByExercisePresetId: ExerciseData[] }, { id: number }>(GetExerciseListByExercisePresetIdGql, {
    variables: { id: Number(exercisePresetId) }
  })
}
export function useLazyGetExerciseListByExercisePresetId() {
  return useLazyQuery<{ getExerciseByExercisePresetId: ExerciseData[] }, { id: number }>(GetExerciseListByExercisePresetIdGql)
}


const DeleteExerciseByIdGql = gql`
mutation DeleteExerciseById($id: ID) {
  deleteExerciseById(id: $id)
}
`
export function useDeleteExerciseById() {
  return useMutation(DeleteExerciseByIdGql)
}