import type { Reference } from '@apollo/client'
import type { DeleteSetResponse, DeleteSetVariable } from '@entities/set/model'
import type { Sets } from '@fitness/struct'
import { useMutation } from '@apollo/client'
import SetsFragment from '@entities/set/api/fragment/SetsFragment'
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
              const setObj = cache.readFragment<Sets.Set>({
                id: cache.identify(set),
                fragment: SetsFragment
              })
              return setObj?.id !== variables.id
            })
            return newData
          }
        }
      })

      cache.evict({
        id: cache.identify({ id: variables.id, __typename: 'Sets' })
      })
    }
  })
}