import type { MockedResponse } from '@apollo/client/testing';
import { ExercisePresetMockData } from './exercisePreset.mockData'
import GetExercisePresetWithListByOffset from './query/GetExercisePresetWithListByOffset';

const GetExercisePresetWithListListMock: MockedResponse<
  GetExercisePresetWithListByOffsetResponse,
  GetExercisePresetWithListByOffsetVariable
> = {
  request: {
    query: GetExercisePresetWithListByOffset
  },
  result: (v) => {
    return {
      data: {
        getExercisePresetWithListByOffset: Object
          .values(ExercisePresetMockData)
          .splice(v.offset, v.size)
          .map(v => {
            v.__typename = 'ExercisePresetWithList'
            return v
          })
      }
    }
  }
}
export default GetExercisePresetWithListListMock