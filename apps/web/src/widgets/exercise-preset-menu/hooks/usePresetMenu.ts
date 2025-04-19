import type { MenuType } from '@shared/model/menuType'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import usePresetActions from './usePresetActions'

type PresetMenuType = (_id: number) => MenuType[]

export default function usePresetMenu(): PresetMenuType {
  const { t } = useTranslation(['preset'])

  const { startWorkoutWithPresetAction, deletePresetAction } = usePresetActions()

  return useCallback((id) => [
    {
      name: t('menu.startWorkoutWithPreset'),
      action: () => startWorkoutWithPresetAction(id)
    },
    {
      name: t('menu.deletePreset'),
      action: () => deletePresetAction(id)
    }
  ], [t, startWorkoutWithPresetAction, deletePresetAction])
}
