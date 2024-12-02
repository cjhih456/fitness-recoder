import { useCallback } from 'react'
import { useCloneSchedule, useDeleteSchedule } from '../../service/GqlStore/Schedule'
import { useAlert } from '../../components/provider/Alert/useAlert'
import { useNavigate } from 'react-router-dom'

export default function useScheduleActions() {
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const [deleteSchedule] = useDeleteSchedule()
  const [cloneSchedule] = useCloneSchedule()

  const deleteScheduleAction = useCallback((id: number) => {
    deleteSchedule({ variables: { id } })
  }, [deleteSchedule])

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
        if (value) navigate(`/${year}-${month}-${date}/workout/${clonedScheduleId}`)
      })
    }
  }, [cloneSchedule, showAlert, navigate])

  return {
    deleteScheduleAction,
    shareScheduleAction,
    cloneScheduleAction
  }
}