import { useCallback } from 'react'
import { useDeleteExercisePreset } from '@hooks/apollo/ExercisePreset'
import { useCloneScheduleFromPreset } from '@hooks/apollo/Schedule'
import { useScheduleActions } from '@hooks/useScheduleMenu'
import DateUtil from '@utils/DateUtil'

export default function usePresetActions() {
  const { gotoScheduleDetail } = useScheduleActions()
  const [deletePreset] = useDeleteExercisePreset()
  const [cloneScheduleFromPreset] = useCloneScheduleFromPreset()

  const startWorkoutWithPresetAction = useCallback((id: number) => {
    const { year, month, date } = DateUtil.takeYearMonthDate()

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