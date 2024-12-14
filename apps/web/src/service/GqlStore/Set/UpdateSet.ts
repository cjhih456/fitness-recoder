import type { SetsStoreType } from '.';
import type { MockedResponse } from '@apollo/client/testing';
import { gql, useMutation } from '@apollo/client'
import { SetMockData } from '.'

type updateSetResponse = { updateSet: SetsStoreType }
type updateSetVariable = { sets: SetsStoreType }
const updateSetGql = gql`
mutation updateSet($sets: UpdateSetsInput!) {
  updateSet(sets: $sets) {
    ...SetsFragment
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