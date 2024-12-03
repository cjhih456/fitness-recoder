import { useCallback } from 'react'
import { useDeleteExercisePreset } from '../../service/GqlStore/ExercisePreset'
import { useCloneScheduleFromPreset } from '../../service/GqlStore/Schedule'
import useScheduleActions from '../useSchedule/useScheduleActions'

export default function usePresetActions() {
  const { gotoScheduleDetail } = useScheduleActions()
  const [deletePreset] = useDeleteExercisePreset()
  const [cloneScheduleFromPreset] = useCloneScheduleFromPreset()

  const startWorkoutWithPresetAction = useCallback((id: number) => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()

    cloneScheduleFromPreset({ variables: { presetId: id, targetDate: { year, month, date } } }).then((result) => {
      result.data && gotoScheduleDetail(result.data.cloneScheduleFromPreset.id, `${year}-${month}-${date}`)
    })
  }, [cloneScheduleFromPreset, gotoScheduleDetail])

  const deletePresetAction = useCallback((id: number) => {
    deletePreset({ variables: { id } })
  }, [deletePreset])
  return {
    startWorkoutWithPresetAction,
    deletePresetAction
  }
}