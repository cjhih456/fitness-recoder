import { Button } from '@heroui/react';
import { Suspense, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetScheduleByDate } from '@entities/schedule/api';
import { ScheduleType } from '@entities/schedule/model/ScheduleType';
import { useScheduleActions } from '@hooks/useScheduleMenu';
import MenuableAccordion from '@shared/ui/MenuableAccordion';
import StateRender from '@shared/ui/StateRender';
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

  const isBreakday = useMemo(() => scheduleList.getScheduleByDate.some(v => v.type === ScheduleType.BREAK) ?? false, [scheduleList])

  return <StateRender.Boolean
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
        <MenuableAccordion.GroupProvider key="schedule-list">
          {scheduleList.getScheduleByDate.map((schedule, idx) => {
            return <Suspense key={schedule.id}>
              <ScheduleDisplay schedule={schedule} date={choosenDate} title={t('schedule.row.title', { n: idx + 1 })} >
                {(id, type) => <div className="grid grid-flow-col auto-cols-auto gap-x-4">
                  <StateRender.Boolean
                    state={type !== 'FINISH'}
                    render={{
                      true: () => <Button key={`${id}-modify`} onPress={() => gotoModifyScheduleAction(id, choosenDate)}>
                        {t('common:modify')}
                      </Button>
                    }}
                  />
                  <Button key={`${id}-detail`} onPress={() => gotoScheduleDetail(id, choosenDate)}>
                    {type === 'FINISH' ? t('common:detail') : t('schedule.actionBtn.start')}
                  </Button>
                </div>}
              </ScheduleDisplay>
            </Suspense>
          })}
        </MenuableAccordion.GroupProvider>
      ]
    }}
  />;
}
