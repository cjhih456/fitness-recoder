import { useMutation } from '@apollo/client'
import CreateSetGql from '@entities/set/api/graphql/mutation/CreateSetGql';

export default function useCreateSet() {
  return useMutation<CreateSetResponse, CreateSetVariable>(CreateSetGql, {
    update: (cache, { data }, { variables }) => {
      if (!data?.createSet) return
      const exerciseId = variables?.sets.exerciseId
      cache.modify({
        fields: {
          getSetListByExerciseId: (existingData, { storeFieldName }) => {
            if (!storeFieldName.includes(JSON.stringify({ id: exerciseId }))) return existingData
            const newData = [...existingData, data.createSet]
            return newData
          }
        }
      })
    }
  })
}