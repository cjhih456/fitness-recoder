import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { SetMockData } from '.'

type CreateSetResponse = { createSet: Sets }
type CreateSetVariable = { sets: SetsCreateType }
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
  return useMutation<CreateSetResponse, CreateSetVariable>(createSetGql)
}
export const CreatesetMock: MockedResponse<CreateSetResponse, CreateSetVariable> = {
  request: {
    query: createSetGql
  },
  result: (v) => {
    const id = Math.max(...Object.keys(SetMockData).map(Number)) + 1
    SetMockData[id] = {
      ...v.sets,
      id: id
    }
    return {
      data: {
        createSet: SetMockData[id]
      }
    }
  }
}