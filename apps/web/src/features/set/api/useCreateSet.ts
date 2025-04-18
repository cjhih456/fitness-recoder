import type { CreateSetVariable, CreateSetResponse } from '@entities/set/model'
import { useMutation } from '@apollo/client'
import SetsFragment from '@entities/set/api/fragment/SetsFragment'
import CreateSetGql from '@entities/set/api/mutation/CreateSetGql'
export default function useCreateSet() {
  return useMutation<CreateSetResponse, CreateSetVariable>(CreateSetGql, {
    update: (cache, { data }, { variables }) => {
      if (!data?.createSet) return
      const exerciseId = variables?.sets.exerciseId
      const ref = cache.writeFragment({
        id: cache.identify({ id: data.createSet.id, __typename: 'Sets' }),
        fragment: SetsFragment,
        data: data.createSet
      })
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