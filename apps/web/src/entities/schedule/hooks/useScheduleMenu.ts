import type { Schedule } from '@fitness/struct';
import type { MenuType } from '@widgets/header';
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import useScheduleActions from './useScheduleActions';

export default function useScheduleMenu(schedule?: Schedule.Data): MenuType[] {
  const { t } = useTranslation(['workout', 'common'])

  const {
    deleteScheduleAction,
    cloneScheduleAction,
    shareScheduleAction
  } = useScheduleActions()

  return useMemo(() => {
    const tempList: MenuType[] = []
    if (!schedule) return tempList
    if (schedule.type === 'FINISH') {
      tempList.push({
        name: t('actionBtn.clone'),
        action: () => cloneScheduleAction(schedule.id)
      }, {
        name: t('actionBtn.share'),
        action: () => shareScheduleAction()
      })
    }
    tempList.push({
      name: t('common:delete'),
      action: () => deleteScheduleAction(schedule.id)
    })
    return tempList
  }, [t, schedule, deleteScheduleAction, cloneScheduleAction, shareScheduleAction])
}