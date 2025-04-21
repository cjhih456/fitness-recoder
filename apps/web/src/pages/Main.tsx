import { Button, ScrollShadow } from '@heroui/react'
import { Suspense, useCallback, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useGetScheduleByDate } from '@entities/schedule/api'
import ScheduleList from '@entities/schedule/ui/ScheduleList'
import { useScheduleActions } from '@features/schedule/hooks'
import ScheduleDisplayWithExerciseList from '@features/schedule/ui/ScheduleWithExerciseList'
import { useHeaderSetValue } from '@shared/hooks/header'
import usePageTracker from '@shared/hooks/usePageTracker'
import { DateService } from '@shared/lib/dateService'
import MenuableAccordion from '@shared/ui/MenuableAccordion'
import { BooleanRender } from '@shared/ui/StateRender'
import { useBottomNavi } from '@widgets/bottomNavi'

export default function Main() {
  useBottomNavi()
  usePageTracker('main')
  const { t } = useTranslation(['main', 'common', 'scheduleList', 'title'])
  const navigate = useNavigate()

  const todayInfo = DateService.takeTodayDateValue()
  const { data: scheduleListData } = useGetScheduleByDate(todayInfo.year, todayInfo.month, todayInfo.date)
  const setHeader = useHeaderSetValue()
  useLayoutEffect(() => {
    setHeader(t('title:home'))
  }, [t, setHeader])

  const {
    gotoCreateScheduleAction,
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
    <BooleanRender
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
            <Suspense>
              <ScheduleList scheduleList={scheduleList}>
                {(schedule, idx) => <ScheduleDisplayWithExerciseList schedule={schedule} idx={idx + 1} />}
              </ScheduleList>
            </Suspense>
          </ScrollShadow>
        </MenuableAccordion.GroupProvider>
      }}
    />
  </div >
}