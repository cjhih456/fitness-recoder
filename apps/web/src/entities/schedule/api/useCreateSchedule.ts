import { useMutation } from '@apollo/client'
import CreateSchedule from '@entities/schedule/api/graphql/mutation/CreateScheduleGql';

export default function useCreateSchedule() {
  return useMutation<CreateScheduleResponse, CreateScheduleVariable>(CreateSchedule, {
    update: (cache, result) => {
      cache.modify<{
        getScheduleStatusByMonth: GetScheduleStatusByMonthResponse['getScheduleStatusByMonth']
        getScheduleByDate: GetScheduleByDateResponse['getScheduleByDate']
      }>({
        fields: {
          getScheduleStatusByMonth(prev) {
            if (!prev || !result.data?.createSchedule) return prev
            if (!Array.isArray(prev)) return prev
            const temp = [...prev]
            const dateTemp = temp[result.data.createSchedule.date] ? [...temp[result.data.createSchedule.date]] : []
            dateTemp.push(result.data.createSchedule.type)
            temp[result.data.createSchedule.date] = dateTemp
            return temp
          },
          getScheduleByDate(prev, { toReference }) {
            if (!prev || !result.data?.createSchedule) return prev
            const ref = toReference(result.data?.createSchedule, true)
            return [...prev, ref]
          }
        }
      })
    }
  })
}