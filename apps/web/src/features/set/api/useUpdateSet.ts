import type { UpdateSetVariable, UpdateSetResponse } from '@features/set/model';
import { useMutation } from '@apollo/client'
import updateSetCache from '@entities/set/lib/updateSetCache'
import UpdateSetGql from '@features/set/api/mutation/UpdateSetGql';
export default function useUpdateSet() {
  return useMutation<UpdateSetResponse, UpdateSetVariable>(UpdateSetGql, {
    update: (cache, { data }) => {
      if (!data) return
      updateSetCache(data.updateSet.id, cache, () => {
        return data.updateSet
      })
    },
  })
}