import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteExercisePreset } from '../../service/GqlStore/ExercisePreset'
import { useCloneScheduleFromPreset } from '../../service/GqlStore/Schedule'

export default function usePresetActions() {
  const navigate = useNavigate()

  const [deletePreset] = useDeleteExercisePreset()
  const [cloneScheduleFromPreset] = useCloneScheduleFromPreset()

  const startWorkoutWithPresetAction = useCallback((id: number) => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()

    cloneScheduleFromPreset({ variables: { presetId: id, targetDate: { year, month, date } } }).then((result) => {
      result.data && navigate(`/${year}-${month}-${date}/workout/${result.data.cloneScheduleFromPreset.id}`)
    })
  }, [navigate, cloneScheduleFromPreset])

  const deletePresetAction = useCallback((id: number) => {
    deletePreset({ variables: { id } })
  }, [deletePreset])
  return {
    startWorkoutWithPresetAction,
    deletePresetAction
  }
}