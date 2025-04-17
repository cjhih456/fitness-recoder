import type { Reference } from '@apollo/client';
import type { Sets } from '@fitness/struct';
import { useMutation } from '@apollo/client';
import DeleteSetGql from '@entities/set/api/graphql/mutation/DeleteSetGql';
import SetsFragment from './graphql/fragment/SetsFragment';
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