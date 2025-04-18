import { useMutation } from '@apollo/client'
import CloneScheduleFromPreset from '@entities/schedule/api/graphql/mutation/CloneScheduleFromPresetGql';

export default function useCloneScheduleFromPreset() {
  return useMutation<CloneScheduleFromPresetResponse, CloneScheduleFromPresetVariable>(CloneScheduleFromPreset, {
    update: (cache, result) => {
      cache.modify<{
        getScheduleByDate: GetScheduleByDateResponse['getScheduleByDate']
      }>({
        fields: {
          getScheduleByDate(prev, { toReference }) {
            if (!prev || !result.data?.cloneScheduleFromPreset) return prev
            const ref = toReference(result.data?.cloneScheduleFromPreset, true)
            return [...prev, ref]
          }
        }
      })
    }
  })
}
