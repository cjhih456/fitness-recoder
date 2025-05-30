import type { NavigateOptions } from 'react-router-dom';
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScheduleType } from '@entities/schedule/model/ScheduleType';
import { useCloneSchedule, useCreateSchedule, useDeleteSchedule } from '@features/schedule/api'
import { useSetAlert } from '@shared/hooks/alert';

export default function useScheduleActions() {
  const navigate = useNavigate()
  const { pushAlert } = useSetAlert()
  const [deleteSchedule] = useDeleteSchedule()
  const [cloneSchedule] = useCloneSchedule()

  const gotoScheduleDetail = useCallback((id: number, date: string, option?: NavigateOptions) => {
    navigate(`/${date}/workout/${id}`, option)
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
          type: ScheduleType.BREAK
        }
      }
    })
  }, [createSchedule])

  const shareScheduleAction = useCallback(() => {
    pushAlert({
      message: 'On Featured process',
    })
    // TODO: schedule data as json
    // TODO: encode json as base64
    // TODO: make QR code
  }, [pushAlert])

  const cloneScheduleAction = useCallback(async (scheduleId: number) => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()
    const result = await cloneSchedule({ variables: { id: scheduleId, targetDate: { year, month, date } } })
    if (result.data?.cloneSchedule) {
      const clonedScheduleId = result.data.cloneSchedule.id
      pushAlert({
        message: 'Clone Schedule Success',
        confirm: { message: 'Goto Workout', colorClass: 'text-green-500' },
        cancel: { message: 'Cancel', colorClass: 'text-red-500' }
      }).then((value) => {
        if (value) gotoScheduleDetail(clonedScheduleId, `${year}-${month}-${date}`)
      })
    }
  }, [cloneSchedule, pushAlert, gotoScheduleDetail])

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