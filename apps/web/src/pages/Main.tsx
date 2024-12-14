import { Button, ScrollShadow } from '@nextui-org/react'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ScheduleDisplay from '@components/Schedule/ScheduleDisplay'
import usePageTracker from '@hooks/usePageTracker'
import { useScheduleActions } from '@hooks/useScheduleMenu'
import { useBottomNavi } from '@provider/BottomNaviProvider'
import { useHeaderHandler } from '@provider/HeaderProvider'
import { useGetScheduleByDate } from '@service/GqlStore/Schedule'

export default function Main() {
  useBottomNavi()
  usePageTracker('main')
  const { t } = useTranslation(['main', 'common', 'scheduleList', 'title'])
  const navigate = useNavigate()

  const todayInfo = useMemo(() => {
    const today = new Date()
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      date: today.getDate()
    }
  }, [])
  const { data: scheduleListData } = useGetScheduleByDate(todayInfo.year, todayInfo.month, todayInfo.date)
  useHeaderHandler([t('title:home')])

  const {
    gotoCreateScheduleAction,
    gotoModifyScheduleAction,
    gotoScheduleDetail
  } = useScheduleActions()

  const addSchedule = useCallback(() => {
    const today = new Date()
    const choosenDate = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    ].join('-')
    gotoCreateScheduleAction(choosenDate, true)
  }, [gotoCreateScheduleAction])

  const gotoPresetPage = useCallback(() => {
    navigate('/preset')
  }, [navigate])
  const displaySchedule = useMemo(() => {
    const scheduleList = scheduleListData?.getScheduleByDate || []
    if (scheduleList.length) {
      return scheduleList.map((schedule, idx) => {
        const choosenDate = [schedule.year, schedule.month, schedule.date].join('-')
        return <ScheduleDisplay key={`schedule-${schedule.id}`} schedule={schedule} date={choosenDate} title={t('scheduleList:schedule.row.title', { n: idx + 1 })} >
          {(id, type, date) =>
            <div className="grid grid-cols-2 gap-x-4">
              <Button onClick={() => gotoModifyScheduleAction(id, date)}>{t('common:modify')}</Button>
              <Button onClick={() => gotoScheduleDetail(id, date)}>
                {type === 'FINISH' ? t('common:detail') : t('scheduleList:schedule.actionBtn.start')}
              </Button>
            </div>
          }
        </ScheduleDisplay>
      })
    } else {
      return [
        <div className="text-center" key="empty-schedule-desc">
          <p>{t('empty.schedule.l1')}</p>
          <p>{t('empty.schedule.l2')}</p>
        </div>,
        <div className="grid grid-cols-2 gap-x-4" key="empty-schedule-options">
          <Button onClick={addSchedule}>{t('empty.schedule.actionBtn.createSchedule')}</Button>
          <Button onClick={gotoPresetPage}>{t('empty.schedule.actionBtn.checkPreset')}</Button>
        </div>
      ]
    }
  }, [scheduleListData, t, gotoPresetPage, addSchedule, gotoModifyScheduleAction, gotoScheduleDetail])

  return <div className="flex flex-col items-stretch h-full pt-4">
    <h2 className="text-xl font-semibold px-4">
      {t('todaySchedule')}
    </h2>
    <ScrollShadow className="p-4 flex flex-col items-stretch gap-y-3">
      {displaySchedule}
    </ScrollShadow>
  </div >
}