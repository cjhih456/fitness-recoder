import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import usePresetActions from './usePresetActions'

export default function usePresetHeaderMenu(id: number): {
  key: string;
  name: string;
  action: () => void;
}[] {
  const { t } = useTranslation(['preset'])

  const { startWorkoutWithPresetAction, deletePresetAction } = usePresetActions()

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

  return headMenu
}
