import type { MockedResponse } from '@apollo/client/testing';
import CreateSetGql from '@entities/set/api/graphql/mutation/CreateSetGql';
import { SetMockData } from '@entities/set/api/set.mockData';

const CreateSetMock: MockedResponse<CreateSetResponse, CreateSetVariable> = {
  request: {
    query: CreateSetGql
  },
  result: (v) => {
    const id = Math.max(...Object.keys(SetMockData).map(Number)) + 1
    SetMockData[id] = {
      ...v.sets,
      id: id
    }
    return {
      data: {
        createSet: SetMockData[id]
      }
    }
  }
}
export default CreateSetMock
