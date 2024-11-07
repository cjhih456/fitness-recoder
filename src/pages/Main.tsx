import { useEffect, useMemo, useState } from 'react'
import { HeaderHandler } from '../components/provider/Header/HeaderHandler'
import { useLazyGetScheduleByDate } from '../service/GqlStore/Schedule'
import ScheduleDisplay from '../components/Schedule/ScheduleDisplay'
import { Button, ScrollShadow } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { useBottomNavi } from '../components/provider/BottomNavi/useBottomNavi'
import { useTranslation } from 'react-i18next'

export default function Main() {
  useBottomNavi()
  const { t } = useTranslation(['main', 'common', 'scheduleList', 'title'])
  const navigate = useNavigate()
  const [scheduleList, setScheduleList] = useState<Schedule[]>([])
  const [loadScheduleData] = useLazyGetScheduleByDate()
  HeaderHandler([t('title:home')])
  useEffect(() => {
    const today = new Date()
    loadScheduleData({
      variables: {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate()
      }
    }).then(result => {
      if (result.data) {
        setScheduleList(result.data.getScheduleByDate)
      }
    })
  }, [])

  function addSchedule() {
    const today = new Date()
    const choosenDate = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    ].join('-')
    navigate(`/${choosenDate}/schedule/create?directStart=1`)
  }
  function gotoPresetPage() {
    navigate('/preset')
  }
  function gotoModify(id: number, date?: string) {
    if (!date) return
    navigate(`/${date}/schedule/${id}`)
  }
  function startSchedule(id: number, date?: string) {
    if (!date) return
    navigate(`/${date}/workout/${id}`)
  }
  const displaySchedule = useMemo(() => {
    if (scheduleList.length) {
      return scheduleList.map((schedule, idx) => {
        const choosenDate = [schedule.year, schedule.month, schedule.date].join('-')
        return <ScheduleDisplay key={`schedule-${schedule.id}`} schedule={schedule} id={schedule.id} date={choosenDate} title={t('scheduleList:schedule.row.title', { n: idx + 1 })} >
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
  }, [scheduleList, t])

  return <div className="flex flex-col items-stretch gap-y-3 px-4 h-full">
    <h2>
      {t('todaySchedule')}
    </h2>
    <ScrollShadow className="flex flex-col items-stretch gap-y-3">
      {displaySchedule}
    </ScrollShadow>
  </div >
}