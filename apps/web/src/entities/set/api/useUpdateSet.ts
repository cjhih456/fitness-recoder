import type { MockedResponse } from '@apollo/client/testing';
import { useMutation } from '@apollo/client'
import UpdateSetGql from './graphql/mutation/UpdateSetGql';
import { SetMockData } from '.'

export default function useUpdateSet() {
  return useMutation<UpdateSetResponse, UpdateSetVariable>(UpdateSetGql)
}
export const UpdateSetMock: MockedResponse<UpdateSetResponse, UpdateSetVariable> = {
  request: {
    query: UpdateSetGql
  },
  result: (variable) => {
    SetMockData[variable.sets.id] = variable.sets
    return {
      data: {
        updateSet: SetMockData[variable.sets.id]
      }
    }
  }
}