import type { CreateSetVariable, CreateSetResponse } from '@features/set/model'
import { useMutation } from '@apollo/client'
import createSetCache from '@entities/set/lib/createSetCache'
import CreateSetGql from '@features/set/api/mutation/CreateSetGql'
export default function useCreateSet() {
  return useMutation<CreateSetResponse, CreateSetVariable>(CreateSetGql, {
    update: (cache, { data }, { variables }) => {
      if (!data?.createSet) return
      const exerciseId = variables?.sets.exerciseId
      const ref = createSetCache(data.createSet.id, cache, data.createSet)
      cache.modify({
        fields: {
          getSetListByExerciseId: (existingData, { storeFieldName }) => {
            if (!storeFieldName.includes(JSON.stringify({ id: exerciseId }))) return existingData
            const newData = [...existingData, ref]
            return newData
          }
        }
      })
    }
  })
}