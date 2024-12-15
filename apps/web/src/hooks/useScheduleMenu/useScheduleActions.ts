import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import useAlert from '@hooks/provider/Alert/useAlert'
import { useCloneSchedule, useCreateSchedule, useDeleteSchedule } from '@service/GqlStore/Schedule'
import { ScheduleType } from '@utils'

export default function useScheduleActions() {
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const [deleteSchedule] = useDeleteSchedule()
  const [cloneSchedule] = useCloneSchedule()

  const gotoScheduleDetail = useCallback((id: number, date: string) => {
    navigate(`/${date}/workout/${id}`)
  }, [navigate])

  const gotoCreateScheduleAction = useCallback((choosenDate: string, direct: boolean = false) => {
    navigate(`/${choosenDate}/schedule/create${direct ? '?directStart=1' : ''}`)
  }, [navigate])

  const gotoModifyScheduleAction = useCallback((id: number, choosenDate: string) => {
    if (!choosenDate) return
    navigate(`/${choosenDate}/schedule/${id}`)
  }, [navigate])

  const [createSchedule] = useCreateSchedule()
  const setBreakDayBySchedule = useCallback((year: number, month: number, date: number) => {
    createSchedule({
      variables: {
        createSchedule: {
          date,
          month,
          year,
          beforeTime: 0,
          breakTime: 0,
          start: 0,
          workoutTimes: 0,
          type: ScheduleType.BREAK
        }
      }
    })
  }, [createSchedule])

  const shareScheduleAction = useCallback(() => {
    showAlert('ERROR', 'On Featured process', false)
    // TODO: schedule data as json
    // TODO: encode json as base64
    // TODO: make QR code
  }, [showAlert])

  const cloneScheduleAction = useCallback(async (scheduleId: number) => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()
    const result = await cloneSchedule({ variables: { id: scheduleId, targetDate: { year, month, date } } })
    if (result.data?.cloneSchedule) {
      const clonedScheduleId = result.data.cloneSchedule.id
      showAlert(
        'SUCCESS',
        'Clone Schedule Success',
        false,
        { message: 'Goto Workout', colorClass: 'text-green-500' },
        { message: 'Cancel', colorClass: 'text-red-500' }
      ).then((value) => {
        if (value) gotoScheduleDetail(clonedScheduleId, `${year}-${month}-${date}`)
      })
    }
  }, [cloneSchedule, showAlert, gotoScheduleDetail])

  const deleteScheduleAction = useCallback((id: number) => {
    deleteSchedule({ variables: { id } })
  }, [deleteSchedule])

  return {
    gotoScheduleDetail,
    gotoCreateScheduleAction,
    gotoModifyScheduleAction,

    setBreakDayBySchedule,

    shareScheduleAction,
    cloneScheduleAction,

    deleteScheduleAction,
  }
}