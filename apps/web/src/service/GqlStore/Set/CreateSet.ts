import type { MockedResponse } from '@apollo/client/testing';
import { gql, useMutation } from '@apollo/client'
import { SetMockData } from '.'

const createSetGql = gql`
mutation createSetByExercise($sets: CreateSetsInput!) {
  createSet(sets: $sets) {
    ...SetsFragment
  }
}
`
export function useCreateSet() {
  return useMutation<CreateSetResponse, CreateSetVariable>(createSetGql)
}
export const CreateSetMock: MockedResponse<CreateSetResponse, CreateSetVariable> = {
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