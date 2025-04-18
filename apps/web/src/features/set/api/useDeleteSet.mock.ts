import type { MockedResponse } from '@apollo/client/testing';
import type { DeleteSetResponse, DeleteSetVariable } from '@entities/set/model';
import DeleteSetGql from '@entities/set/api/mutation/DeleteSetGql';
import { SetMockData } from '@entities/set/api/set.mockData';

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
