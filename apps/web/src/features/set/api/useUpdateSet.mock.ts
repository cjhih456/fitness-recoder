import type { MockedResponse } from '@apollo/client/testing';
import type { UpdateSetResponse, UpdateSetVariable } from '@features/set/model';
import { SetMockData } from '@entities/set/api/set.mockData';
import UpdateSetGql from '@features/set/api/mutation/UpdateSetGql';

const UpdateSetMock: MockedResponse<UpdateSetResponse, UpdateSetVariable> = {
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
export default UpdateSetMock
