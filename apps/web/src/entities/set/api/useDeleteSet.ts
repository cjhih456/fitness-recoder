import type { MockedResponse } from '@apollo/client/testing';
import { useMutation } from '@apollo/client';
import { SetMockData } from '@entities/set/api';
import DeleteSetGql from '@entities/set/api/graphql/mutation/DeleteSetGql';

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