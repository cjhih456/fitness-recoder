import { useMutation } from '@apollo/client'
import UpdateSetGql from './graphql/mutation/UpdateSetGql';

export default function useUpdateSet() {
  return useMutation<UpdateSetResponse, UpdateSetVariable>(UpdateSetGql, {
    update: (cache, { data }) => {
      if (!data) return
      cache.modify({
        id: cache.identify(data.updateSet),
        fields: {
          isDone: () => data.updateSet.isDone,
          weight: () => data.updateSet.weight,
          repeat: () => data.updateSet.repeat,
          weightUnit: () => data.updateSet.weightUnit,
          duration: () => data.updateSet.duration,
        }
      })
    },
  })
}