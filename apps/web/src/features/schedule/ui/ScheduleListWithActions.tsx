import type { FC } from 'react';
import { Button } from '@heroui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetScheduleByDate } from '@entities/schedule/api'
import { ScheduleType } from '@entities/schedule/model/ScheduleType'
import ScheduleList from '@entities/schedule/ui/ScheduleList'
import { BooleanRender } from '@shared/ui/StateRender'
import { useScheduleActions } from '../hooks'
import ScheduleDisplayWithExerciseList from './ScheduleWithExerciseList';
interface ScheduleListWithActionsProps {
  choosenDate: string,
}

const ScheduleListWithActions: FC<ScheduleListWithActionsProps> = ({ choosenDate }) => {
  const { t } = useTranslation(['scheduleList', 'common'])

  const [year, month, date] = useMemo(() => {
    return choosenDate.split('-').map(v => +v)
  }, [choosenDate])
  const { data: scheduleList } = useGetScheduleByDate(year, month, date)

  const isBreakday = useMemo(() => scheduleList.getScheduleByDate.some(v => v.type === ScheduleType.BREAK) ?? false, [scheduleList])

  const {
    gotoCreateScheduleAction,
    setBreakDayBySchedule
  } = useScheduleActions()

  return <BooleanRender
    state={isBreakday}
    render={{
      true: () => <div role="breakday-list"></div>,
      false: () => [
        <div key="btn-menu" role="btn-menu" className="grid grid-cols-2 gap-x-4 sticky top-0 bg-background z-10">
          <Button
            className="bg-success-300"
            onPress={() => gotoCreateScheduleAction(choosenDate)}
          >
            {t('schedule.bottomBtn.addSchedule')}
          </Button>
          <Button
            className="bg-danger-400"
            isDisabled={Boolean(scheduleList?.getScheduleByDate.length)}
            onPress={() => setBreakDayBySchedule(year, month, date)}
          >
            {t('schedule.bottomBtn.setBreakDay')}
          </Button>
        </div>,
        <ScheduleList
          key={`schedule-list-${choosenDate}`}
          scheduleList={scheduleList.getScheduleByDate}
        >
          {(schedule, idx) => <ScheduleDisplayWithExerciseList schedule={schedule} idx={idx + 1} />}
        </ScheduleList>
      ]
    }}
  />
}

export default ScheduleListWithActions