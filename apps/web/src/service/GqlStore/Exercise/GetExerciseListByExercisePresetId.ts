import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { Exercise } from 'fitness-struct'


type GetExerciseByExercisePresetIdResponse = {
  getExerciseListByExercisePresetId: Exercise.Data[]
}
type GetExerciseByExercisePresetIdVariable = {
  exercisePresetId: number
}
const GetExerciseListByExercisePresetIdGql = gql`
query GetExerciseByExercisePresetId($exercisePresetId: Int) {
  getExerciseListByExercisePresetId(exercisePresetId: $exercisePresetId) {
    id
    deps
    exercise
  }
}`
export function useGetExerciseListByExercisePresetId(exercisePresetId: number) {
  return useQuery<
    GetExerciseByExercisePresetIdResponse,
    GetExerciseByExercisePresetIdVariable
  >(GetExerciseListByExercisePresetIdGql, {
    variables: { exercisePresetId: Number(exercisePresetId) }
  })
}
export function useLazyGetExerciseListByExercisePresetId() {
  return useLazyQuery<
    GetExerciseByExercisePresetIdResponse,
    GetExerciseByExercisePresetIdVariable
  >(GetExerciseListByExercisePresetIdGql)
}
export const GetExerciseListByExercisePresetIdMock: MockedResponse<
  GetExerciseByExercisePresetIdResponse,
  GetExerciseByExercisePresetIdVariable
> = {
  request: {
    query: GetExerciseListByExercisePresetIdGql,
  },
  result: () => {
    return {
      data: {
        getExerciseListByExercisePresetId: [
          {
            id: 1,
            exercise: 1,
            deps: 0
          },
          {
            id: 2,
            exercise: 2,
            deps: 0
          }
        ]
      }
    }
  }
}