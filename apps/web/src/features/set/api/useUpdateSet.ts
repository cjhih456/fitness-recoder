import type { UpdateSetVariable, UpdateSetResponse } from '@entities/set/model';
import { useMutation } from '@apollo/client'
import SetsFragment from '@entities/set/api/fragment/SetsFragment';
import UpdateSetGql from '@features/set/api/mutation/UpdateSetGql';
export default function useUpdateSet() {
  return useMutation<UpdateSetResponse, UpdateSetVariable>(UpdateSetGql, {
    update: (cache, { data }) => {
      if (!data) return
      cache.updateFragment({
        id: cache.identify(data.updateSet),
        fragment: SetsFragment
      }, (data) => {
        return data.updateSet
      })
    },
  })
}