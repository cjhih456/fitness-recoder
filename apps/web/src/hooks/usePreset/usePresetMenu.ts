import { useCallback, useMemo } from 'react'
import { useDeleteExercisePreset } from '../../service/GqlStore/ExercisePreset'
import { useCloneScheduleFromPreset } from '../../service/GqlStore/Schedule'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'


function usePresetMenu(_type: 'menu', _id: number): { [k: string]: () => void }
// eslint-disable-next-line no-redeclare
function usePresetMenu(_type: 'headmenu', _id: number): {
  key: string;
  name: string;
  action: () => void;
}[]

// eslint-disable-next-line no-redeclare
function usePresetMenu(type: string, id: number) {
  const navigate = useNavigate()
  const { t } = useTranslation(['preset'])

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

  const menu = useMemo(() => ({
    [t('menu.startWorkoutWithPreset')]: () => startWorkoutWithPresetAction(id),
    [t('menu.deletePreset')]: () => deletePresetAction(id)
  }), [t, id, startWorkoutWithPresetAction, deletePresetAction])

  const headMenu = useMemo(() => [
    {
      key: 'startWorkoutWithPreset',
      name: t('menu.startWorkoutWithPreset'),
      action: () => startWorkoutWithPresetAction(id)
    },
    {
      key: 'deletePreset',
      name: t('menu.deletePreset'),
      action: () => deletePresetAction(id)
    }
  ], [t, id, startWorkoutWithPresetAction, deletePresetAction])

  if (type === 'menu') {
    return menu
  } else if (type === 'headmenu') {
    return headMenu
  }
}

export default usePresetMenu