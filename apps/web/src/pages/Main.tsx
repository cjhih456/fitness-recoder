import { Button, ScrollShadow } from '@heroui/react'
import { Suspense, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useGetScheduleByDate } from '@entities/schedule/api'
import { useScheduleActions } from '@entities/schedule/hooks'
import usePageTracker from '@shared/hooks/usePageTracker'
import MenuableAccordion from '@shared/ui/MenuableAccordion'
import StateRender from '@shared/ui/StateRender'
import ScheduleDisplay from '@ui/Schedule/ScheduleDisplay'
import { useBottomNavi } from '@widgets/bottomNavi'
import { DateService } from '@widgets/calender'
import { useHeaderHandler } from '@widgets/header'

export default function Main() {
  useBottomNavi()
  usePageTracker('main')
  const { t } = useTranslation(['main', 'common', 'scheduleList', 'title'])
  const navigate = useNavigate()

  const todayInfo = DateService.takeTodayDateValue()
  const { data: scheduleListData } = useGetScheduleByDate(todayInfo.year, todayInfo.month, todayInfo.date)
  useHeaderHandler(t('title:home'))

  const {
    gotoCreateScheduleAction,
    gotoModifyScheduleAction,
    gotoScheduleDetail
  } = useScheduleActions()

  const addSchedule = useCallback(() => {
    const choosenDate = [
      todayInfo.year,
      todayInfo.month,
      todayInfo.month
    ].join('-')
    gotoCreateScheduleAction(choosenDate, true)
  }, [gotoCreateScheduleAction, todayInfo])

  const gotoPresetPage = useCallback(() => {
    navigate('/preset')
  }, [navigate])
  const scheduleList = scheduleListData.getScheduleByDate || []

  return <div className="flex flex-col items-stretch h-full pt-4">
    <h2 className="text-xl font-semibold px-4">
      {t('todaySchedule')}
    </h2>
    <StateRender.Boolean
      state={Boolean(scheduleList.length)}
      render={{
        false: () => [
          <div className="text-center" key="empty-schedule-desc">
            <p>{t('empty.schedule.l1')}</p>
            <p>{t('empty.schedule.l2')}</p>
          </div>,
          <div className="grid grid-cols-2 gap-x-4" key="empty-schedule-options">
            <Button onPress={addSchedule}>{t('empty.schedule.actionBtn.createSchedule')}</Button>
            <Button onPress={gotoPresetPage}>{t('empty.schedule.actionBtn.checkPreset')}</Button>
          </div>
        ],
        true: () => <MenuableAccordion.GroupProvider>
          <ScrollShadow className="p-4 flex flex-col items-stretch gap-y-3">
            {scheduleList.map((schedule, idx) => {
              const choosenDate = [schedule.year, schedule.month, schedule.date].join('-')
              return <Suspense key={schedule.id}>
                <ScheduleDisplay schedule={schedule} date={choosenDate} title={t('scheduleList:schedule.row.title', { n: idx + 1 })} >
                  {(id, type, date) =>
                    <div className="grid grid-cols-2 gap-x-4">
                      <Button onPress={() => gotoModifyScheduleAction(id, date)}>{t('common:modify')}</Button>
                      <Button onPress={() => gotoScheduleDetail(id, date)}>
                        {type === 'FINISH' ? t('common:detail') : t('scheduleList:schedule.actionBtn.start')}
                      </Button>
                    </div>
                  }
                </ScheduleDisplay>
              </Suspense>
            })}
          </ScrollShadow>
        </MenuableAccordion.GroupProvider>
      }}
    />
  </div >
}