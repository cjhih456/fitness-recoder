import { Button } from '@nextui-org/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useScheduleActions } from '@hooks/useScheduleMenu';
import { useGetScheduleByDate } from '@service/GqlStore/Schedule';
import { ScheduleType } from '@utils';
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

  const displaySchedule = useMemo(() => {
    const breakSchedule = scheduleList?.getScheduleByDate?.find(v => v.type === ScheduleType.BREAK)
    const displayList = []

    if (breakSchedule) {
      displayList.push(<div key="breakday-list"></div>)
      return displayList
    }
    displayList.push(<div key="btn-menu" className="grid grid-cols-2 gap-x-4 sticky top-0 bg-background z-10">
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
    </div>)
    if (scheduleList?.getScheduleByDate) {
      displayList.push(scheduleList?.getScheduleByDate.map((schedule, idx) => {
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
      }))
    }

    return displayList
  }, [scheduleList, gotoCreateScheduleAction, gotoModifyScheduleAction, setBreakDayBySchedule, gotoScheduleDetail, choosenDate, year, month, date, t])

  return (
    <>
      {displaySchedule}
    </>
  );
}
