
import { useCallback, useMemo } from 'react'
import { useDeleteSchedule } from '../../service/GqlStore/Schedule'
import { useTranslation } from 'react-i18next'


function useScheduleMenu(_type: 'menu', _id: number): { [k: string]: () => void }
// eslint-disable-next-line no-redeclare
function useScheduleMenu(_type: 'headmenu', _id: number): {
  key: string;
  name: string;
  action: () => void;
}[]

// eslint-disable-next-line no-redeclare
function useScheduleMenu(type: string, id: number) {
  const { t } = useTranslation(['common'])

  const [deleteSchedule] = useDeleteSchedule()

  const deleteScheduleAction = useCallback((id: number) => {
    deleteSchedule({ variables: { id } })
  }, [deleteSchedule])

  const menu = useMemo(() => ({
    [t('delete')]: () => deleteScheduleAction(id)
  }), [t, id, deleteScheduleAction])

  const headMenu = useMemo(() => [
    {
      key: 'deleteSchedule',
      name: t('delete'),
      action: () => deleteScheduleAction(id)
    }
  ], [t, id, deleteScheduleAction])

  if (type === 'menu') {
    return menu
  } else if (type === 'headmenu') {
    return headMenu
  }
}

export default useScheduleMenu