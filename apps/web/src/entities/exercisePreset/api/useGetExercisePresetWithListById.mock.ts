import type { MockedResponse } from '@apollo/client/testing';
import { ExercisePresetMockData } from './exercisePreset.mockData'
import GetExercisePresetWithListById from './graphql/query/GetExercisePresetWithListById';

const GetExercisePresetWithListByIdMock: MockedResponse<
  GetExercisePresetWithListByIdResponse,
  GetExercisePresetWithListByIdVariable
> = {
  request: {
    query: GetExercisePresetWithListById
  },
  result: (v) => {
    const temp = ExercisePresetMockData[v.id]
    temp.__typename = 'ExercisePresetWithList'
    return {
      data: {
        getExercisePresetWithListById: temp
      }
    }
  }
}
export default GetExercisePresetWithListByIdMock