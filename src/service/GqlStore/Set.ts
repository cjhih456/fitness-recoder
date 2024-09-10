import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';

const getSetListByExerciseIdGql = gql`
query GetSetListByExerciseId($id: ID!) {
  getSetListByExerciseId(id: $id) {
    duration
    exerciseId
    id
    isDone
    repeat
    weight
    weightUnit
  }
}
`
export function useGetSetListByExerciseId(id: number) {
  return useQuery<{ getSetListByExerciseId: Sets[] }, { id: number }>(getSetListByExerciseIdGql, {
    variables: { id }
  })
}
export function useLazyGetSetListByExerciseId() {
  return useLazyQuery<{ getSetListByExerciseId: Sets[] }, { id: number }>(getSetListByExerciseIdGql)
}


const createSetGql = gql`
mutation createSetByExercise($sets: CreateSetsInput!) {
  createSet(sets: $sets) {
    id
    exerciseId
    repeat
    isDone
    weightUnit
    weight
    duration
  }
}
`
export function useCreateSet() {
  return useMutation<{ createSet: Sets }, { sets: SetsCreateType }>(createSetGql)
}


const updateSetGql = gql`
mutation updateSet($sets: UpdateSetsInput!) {
  updateSet(sets: $sets) {
    id
    exerciseId
    repeat
    isDone
    weightUnit
    weight
    duration
  }
}`
export function useUpdateSet() {
  return useMutation<{ updateSet: Sets }, { sets: Sets }>(updateSetGql)
}


const deleteSetGql = gql`
mutation deleteSet($id: ID!) {
  deleteSetById(id: $id)
}`
export function useDeleteSet() {
  return useMutation<{ updateSet: Sets }, { id: number }>(deleteSetGql)
}