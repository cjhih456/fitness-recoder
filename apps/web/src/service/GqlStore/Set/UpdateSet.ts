import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'
import { SetMockData } from '.'
import { Sets } from 'fitness-struct'

type updateSetResponse = { updateSet: Sets.Sets }
type updateSetVariable = { sets: Sets.Sets }
const updateSetGql = gql`
mutation updateSet($sets: UpdateSetsInput!) {
  updateSet(sets: $sets) {
    id
    exerciseId
    repeat
    isDone
    weightUnit
    weight
    duration
  }
}`
export function useUpdateSet() {
  return useMutation<updateSetResponse, updateSetVariable>(updateSetGql)
}
export const UpdateSetMock: MockedResponse<updateSetResponse, updateSetVariable> = {
  request: {
    query: updateSetGql
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