import type { MockedResponse } from '@apollo/client/testing';
import UpdateSetGql from './graphql/mutation/UpdateSetGql';
import { SetMockData } from '.';

export const UpdateSetMock: MockedResponse<UpdateSetResponse, UpdateSetVariable> = {
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