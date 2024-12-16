import type { MockedResponse } from '@apollo/client/testing';
import { useMutation } from '@apollo/client'
import CreateSetGql from '@graphQuery/Mutation/Set/CreateSetGql';
import { SetMockData } from '.'

export default function useCreateSet() {
  return useMutation<CreateSetResponse, CreateSetVariable>(CreateSetGql)
}
export const CreateSetMock: MockedResponse<CreateSetResponse, CreateSetVariable> = {
  request: {
    query: CreateSetGql
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