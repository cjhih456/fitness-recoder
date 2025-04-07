import type { MockedResponse } from '@apollo/client/testing';
import { SetMockData } from '@entities/set/api';
import DeleteSetGql from '@entities/set/api/graphql/mutation/DeleteSetGql';

const DeleteSetMock: MockedResponse<DeleteSetResponse, DeleteSetVariable> = {
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
export default DeleteSetMock
