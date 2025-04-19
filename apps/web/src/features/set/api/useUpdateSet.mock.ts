import type { MockedResponse } from '@apollo/client/testing';
import type { UpdateSetResponse, UpdateSetVariable } from '@entities/set/model';
import UpdateSetGql from '@features/set/api/mutation/UpdateSetGql';
import { SetMockData } from '@entities/set/api/set.mockData';

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
