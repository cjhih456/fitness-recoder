import type { MockedResponse } from '@apollo/client/testing';
import { useMutation } from '@apollo/client';
import DeleteSetGql from '@graphQuery/Mutation/Set/DeleteSetGql';
import { SetMockData } from '.';

export default function useDeleteSet() {
  return useMutation<DeleteSetResponse, DeleteSetVariable>(DeleteSetGql)
}
export const DeleteSetMock: MockedResponse<DeleteSetResponse, DeleteSetVariable> = {
  request: {
    query: DeleteSetGql,
  },
  result: (v) => {
    delete SetMockData[v.id]
    return {
      data: {
        deleteSetById: `delete - sets - ${v.id}`
      }
    }
  }
}