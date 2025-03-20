import { Button } from '@heroui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetScheduleByDate } from '@hooks/apollo/Schedule';
import { useScheduleActions } from '@hooks/useScheduleMenu';
import { ScheduleType } from '@utils';
import StateRender from '@utils/StateRender';
import ScheduleDisplay from './ScheduleDisplay';

export interface ScheduleListProps {
  choosenDate: string
}

export default function ScheduleList({ choosenDate }: ScheduleListProps) {
  const { t } = useTranslation(['scheduleList', 'common'])
  const [year, month, date] = useMemo(() => {
    return choosenDate.split('-').map(v => +v)
  }, [choosenDate])
  const { data: scheduleList } = useGetScheduleByDate(year, month, date)

  const {
    gotoScheduleDetail,
    gotoCreateScheduleAction,
    gotoModifyScheduleAction,
    setBreakDayBySchedule
  } = useScheduleActions()

  const isBreakday = useMemo(() => scheduleList?.getScheduleByDate?.some(v => v.type === ScheduleType.BREAK) ?? false, [scheduleList])

  return <StateRender.Boolean
    state={isBreakday}
    render={{
      true: <div key="breakday-list"></div>,
      false: [
        <div key="btn-menu" className="grid grid-cols-2 gap-x-4 sticky top-0 bg-background z-10">
          <Button
            className="bg-success-300"
            onClick={() => gotoCreateScheduleAction(choosenDate)}
          >
            {t('schedule.bottomBtn.addSchedule')}
          </Button>
          <Button
            className="bg-danger-400"
            isDisabled={Boolean(scheduleList?.getScheduleByDate.length)}
            onClick={() => setBreakDayBySchedule(year, month, date)}
          >
            {t('schedule.bottomBtn.setBreakDay')}
          </Button>
        </div>,
        scheduleList?.getScheduleByDate.map((schedule, idx) => {
          return <ScheduleDisplay key={schedule.id} schedule={schedule} date={choosenDate} title={t('schedule.row.title', { n: idx + 1 })} >
            {(id, type) => {
              const btnList = []
              if (type !== 'FINISH') {
                btnList.push(<Button key={`${id}-modify`} onClick={() => gotoModifyScheduleAction(id, choosenDate)}>
                  {t('common:modify')}
                </Button>)
              }
              btnList.push(<Button key={`${id}-detail`} onClick={() => gotoScheduleDetail(id, choosenDate)}>
                {type === 'FINISH' ? t('common:detail') : t('schedule.actionBtn.start')}
              </Button>)
              return <div className={['grid', 'grid-cols-' + btnList.length, 'gap-x-4'].join(' ')}>
                {btnList}
              </div>
            }}
          </ScheduleDisplay>
        })
      ]
    }}
  />;
}
