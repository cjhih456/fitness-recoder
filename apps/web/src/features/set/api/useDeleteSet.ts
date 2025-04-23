import type { Reference } from '@apollo/client'
import type { DeleteSetResponse, DeleteSetVariable } from '@features/set/model'
import { useMutation } from '@apollo/client'
import deleteSetCache from '@entities/set/lib/deleteSetCache'
import getSetCache from '@entities/set/lib/getSetCache'
import DeleteSetGql from '@features/set/api/mutation/DeleteSetGql'

export default function useDeleteSet() {
  return useMutation<DeleteSetResponse, DeleteSetVariable>(DeleteSetGql, {
    update: (cache, { data }, { variables }) => {
      if (!data?.deleteSetById) return
      if (!variables?.id) return
      cache.modify({
        fields: {
          getSetListByExerciseId: (existingData) => {
            const newData = existingData.filter((set: Reference) => {
              const setObj = getSetCache(set, cache)
              return setObj?.id !== variables.id
            })
            return newData
          }
        }
      })

      deleteSetCache(variables.id, cache)
    }
  })
}