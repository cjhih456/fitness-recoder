import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import usePresetActions from './usePresetActions'


function usePresetMenu(id: number): { [k: string]: () => void } {
  const { t } = useTranslation(['preset'])

  const { startWorkoutWithPresetAction, deletePresetAction } = usePresetActions()

  const menu = useMemo(() => ({
    [t('menu.startWorkoutWithPreset')]: () => startWorkoutWithPresetAction(id),
    [t('menu.deletePreset')]: () => deletePresetAction(id)
  }), [t, id, startWorkoutWithPresetAction, deletePresetAction])

  return menu
}

export default usePresetMenu