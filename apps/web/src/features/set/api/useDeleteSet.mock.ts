import type { MockedResponse } from '@apollo/client/testing';
import type { DeleteSetResponse, DeleteSetVariable } from '@features/set/model';
import { SetMockData } from '@entities/set/api/set.mockData';
import DeleteSetGql from '@features/set/api/mutation/DeleteSetGql';

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
