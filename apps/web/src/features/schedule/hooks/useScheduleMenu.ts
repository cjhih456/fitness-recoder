import type { Schedule } from '@fitness/struct';
import type { MenuType } from '@shared/model/menuType';
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next';
import useScheduleActions from './useScheduleActions';

interface ScheduleMenuProps {
  scheduleId: number,
  scheduleType: Schedule.IType
}

export default function useScheduleMenu(): (_props: ScheduleMenuProps) => MenuType[] {
  const { t } = useTranslation(['workout', 'common'])

  const {
    deleteScheduleAction,
    cloneScheduleAction,
    shareScheduleAction
  } = useScheduleActions()

  return useCallback(({ scheduleId, scheduleType }: ScheduleMenuProps) => {
    const tempList: MenuType[] = []
    if (scheduleType === 'FINISH') {
      tempList.push({
        name: t('actionBtn.clone'),
        action: () => cloneScheduleAction(scheduleId)
      }, {
        name: t('actionBtn.share'),
        action: () => shareScheduleAction()
      })
    }
    tempList.push({
      name: t('common:delete'),
      action: () => deleteScheduleAction(scheduleId)
    })
    return tempList
  }, [t, deleteScheduleAction, cloneScheduleAction, shareScheduleAction])
}