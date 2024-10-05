import { gql, useMutation } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';
import { SetMockData } from '.';

type DeleteSetResponse = { deleteSetById: string }
type DeleteSetVariable = { id: number }
const deleteSetGql = gql`
mutation deleteSet($id: ID!) {
  deleteSetById(id: $id)
}`
export function useDeleteSet() {
  return useMutation<DeleteSetResponse, DeleteSetVariable>(deleteSetGql)
}
export const UpdateSetMock: MockedResponse<DeleteSetResponse, DeleteSetVariable> = {
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