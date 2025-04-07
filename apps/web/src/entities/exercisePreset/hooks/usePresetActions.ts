import { useCallback } from 'react'
import { useDeleteExercisePreset } from '@entities/exercisePreset/api'
import { useCloneScheduleFromPreset } from '@entities/schedule/api'
import { useScheduleActions } from '@entities/schedule/hooks'
import { DateService } from '@widgets/calender'

export default function usePresetActions() {
  const { gotoScheduleDetail } = useScheduleActions()
  const [deletePreset] = useDeleteExercisePreset()
  const [cloneScheduleFromPreset] = useCloneScheduleFromPreset()

  const startWorkoutWithPresetAction = useCallback((id: number) => {
    const { year, month, date } = DateService.takeTodayDateValue()

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