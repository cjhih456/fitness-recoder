import type { MenuType } from '@provider/Header/HeaderProvider';
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import usePresetActions from './usePresetActions'

export default function usePresetMenu(id: number): MenuType[] {
  const { t } = useTranslation(['preset'])

  const { startWorkoutWithPresetAction, deletePresetAction } = usePresetActions()

  return useMemo(() => [
    {
      name: t('menu.startWorkoutWithPreset'),
      action: () => startWorkoutWithPresetAction(id)
    },
    {
      name: t('menu.deletePreset'),
      action: () => deletePresetAction(id)
    }
  ], [t, id, startWorkoutWithPresetAction, deletePresetAction])
}
