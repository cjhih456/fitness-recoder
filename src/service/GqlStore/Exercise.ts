import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';

const CreateExerciseByScheduleGql = gql`
mutation CreateExerciseBySchedule ($exercise: CreateExerciseByScheduleInput!) {
  createExerciseBySchedule(exercise: $exercise) {
    id
    deps
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
mutation UpdateExerciseListByScheduleId($scheduleId: Int, $newExercise: [Int!], $deleteExerciseId: [Int!]) {
  updateExerciseListByScheduleId(scheduleId: $scheduleId, newExercise: $newExercise, deleteExerciseId: $deleteExerciseId){
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
    deleteExerciseId: number[]
  }>(UpdateExerciseListByScheduleIdGql)
}

const CreateExerciseByExercisePreset = gql`
mutation CreateExerciseByExercisePreset($exercise: CreateExerciseByExercisePresetInput!) {
  createExerciseByExercisePreset(exercise: $exercise) {
    id
    deps
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
mutation UpdateExerciseListByExercisePresetId($exercisePresetId: Int, $newExercise: [Int!], $deleteExerciseId: [Int!]) {
  updateExerciseListByExercisePresetId(exercisePresetId: $exercisePresetId, newExercise: $newExercise, deleteExerciseId: $deleteExerciseId) {
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
    newExercise: number[],
    deleteExerciseId: number[]
  }>(updateExerciseListByExercisePresetIdGql)
}

const GetExerciseListByScheduleIdGql = gql`
query GetExerciseListByScheduleId($scheduleId: ID) {
  getExerciseListByScheduleId(scheduleId: $scheduleId) {
    id
    deps
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
query GetExerciseByExercisePresetId($exercisePresetId: ID) {
  getExerciseListByExercisePresetId(exercisePresetId: $exercisePresetId) {
    id
    deps
    exercise
  }
}`
export function useGetExerciseListByExercisePresetId(exercisePresetId: number) {
  return useQuery<{ getExerciseListByExercisePresetId: ExerciseData[] }, { exercisePresetId: number }>(GetExerciseListByExercisePresetIdGql, {
    variables: { exercisePresetId: Number(exercisePresetId) }
  })
}
export function useLazyGetExerciseListByExercisePresetId() {
  return useLazyQuery<{ getExerciseListByExercisePresetId: ExerciseData[] }, { exercisePresetId: number }>(GetExerciseListByExercisePresetIdGql)
}


const getExerciseFinishHistoryGql = gql`
query GetExerciseFinishHistory($exerciseId: ID) {
  getExerciseFinishHistory(exerciseId: $exerciseId) {
    id
    type
    year
    month
    date
    exercise
    cnt
    hasDone
    weights
    repeats
    weightUnit
  }
}
`
export function useLazyGetExerciseFinishHistory() {
  return useLazyQuery<
    { getExerciseFinishHistory: ExerciseHistoryData[] },
    { exerciseId: number }
  >(getExerciseFinishHistoryGql)
}

const DeleteExerciseByIdGql = gql`
mutation DeleteExerciseById($id: ID) {
  deleteExerciseById(id: $id)
}
`
export function useDeleteExerciseById() {
  return useMutation(DeleteExerciseByIdGql)
}