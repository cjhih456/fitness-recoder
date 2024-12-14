import type { MockedResponse } from '@apollo/client/testing';
import { gql, useMutation } from '@apollo/client';
import { SetMockData } from '.';

type DeleteSetResponse = { deleteSetById: string }
type DeleteSetVariable = { id: number }
const deleteSetGql = gql`
mutation deleteSet($id: Int!) {
  deleteSetById(id: $id)
}`
export function useDeleteSet() {
  return useMutation<DeleteSetResponse, DeleteSetVariable>(deleteSetGql)
}
export const DeleteSetMock: MockedResponse<DeleteSetResponse, DeleteSetVariable> = {
  request: {
    query: deleteSetGql,
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