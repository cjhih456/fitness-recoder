import { useCallback, useMemo } from 'react'
import { HeaderHandler } from '../components/provider/Header/HeaderHandler'
import { useGetScheduleByDate } from '../service/GqlStore/Schedule'
import ScheduleDisplay from '../components/Schedule/ScheduleDisplay'
import { Button, ScrollShadow } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { useBottomNavi } from '../components/provider/BottomNavi/useBottomNavi'
import { useTranslation } from 'react-i18next'
import usePageTracker from '../hooks/usePageTracker'

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
  const scheduleList = useMemo(() => scheduleListData?.getScheduleByDate || [], [scheduleListData])
  HeaderHandler([t('title:home')])

  const addSchedule = useCallback(() => {
    const today = new Date()
    const choosenDate = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    ].join('-')
    navigate(`/${choosenDate}/schedule/create?directStart=1`)
  }, [navigate])
  const gotoPresetPage = useCallback(() => {
    navigate('/preset')
  }, [navigate])
  const gotoModify = useCallback((id: number, date?: string) => {
    if (!date) return
    navigate(`/${date}/schedule/${id}`)
  }, [navigate])
  const startSchedule = useCallback((id: number, date?: string) => {
    if (!date) return
    navigate(`/${date}/workout/${id}`)
  }, [navigate])
  const displaySchedule = useMemo(() => {
    if (scheduleList.length) {
      return scheduleList.map((schedule, idx) => {
        const choosenDate = [schedule.year, schedule.month, schedule.date].join('-')
        return <ScheduleDisplay key={`schedule-${schedule.id}`} schedule={schedule} date={choosenDate} title={t('scheduleList:schedule.row.title', { n: idx + 1 })} >
          {(id, type, date) => (
            <div className="grid grid-cols-2 gap-x-4">
              <Button onClick={() => gotoModify(id, date)}>{t('common:modify')}</Button>
              <Button onClick={() => startSchedule(id, date)}>
                {type === 'FINISH' ? t('common:detail') : t('scheduleList:schedule.actionBtn.start')}
              </Button>
            </div>
          )}
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
  }, [scheduleList, t, gotoPresetPage, addSchedule, startSchedule, gotoModify])

  return <div className="flex flex-col items-stretch h-full pt-4">
    <h2 className="text-xl font-semibold px-4">
      {t('todaySchedule')}
    </h2>
    <ScrollShadow className="p-4 flex flex-col items-stretch gap-y-3">
      {displaySchedule}
    </ScrollShadow>
  </div >
}