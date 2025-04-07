import type { MockedResponse } from '@apollo/client/testing';
import { SetMockData } from '@entities/set/api';
import CreateSetGql from '@entities/set/api/graphql/mutation/CreateSetGql';

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
