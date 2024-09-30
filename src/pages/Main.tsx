import { useEffect, useMemo, useState } from 'react'
import { HeaderHandler } from '../components/provider/Header/useHeaderContext'
import { useLazyScheduleByDate } from '../service/GqlStore/Schedule'
import ScheduleDisplay from '../components/Schedule/ScheduleDisplay'
import { Button } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { useBottomNavi } from '../components/provider/BottomNavi/useBottomNavi'

export default function Main() {
  useBottomNavi()
  const navigate = useNavigate()
  const [scheduleList, setScheduleList] = useState<Schedule[]>([])
  const [loadScheduleData] = useLazyScheduleByDate()
  HeaderHandler(['Main'])
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
        return <ScheduleDisplay key={`schedule-${schedule.id}`} schedule={schedule} id={schedule.id} date={choosenDate} title={`Part ${idx + 1}`} >
          {(id, type, date) => (
            <div className="grid grid-cols-2 gap-x-4">
              <Button onClick={() => gotoModify(id, date)}>Modify</Button>
              <Button onClick={() => startSchedule(id, date)}>
                {type === 'FINISH' ? 'Detail' : 'Start'}
              </Button>
            </div>
          )}
        </ScheduleDisplay>
      })
    } else {
      return [
        <div className="text-center" key="empty-schedule-desc">
          <p>Don't have Schedule Yet.</p>
          <p>Add Schedule or Check Presets</p>
        </div>,
        <div className="grid grid-cols-2 gap-x-4" key="empty-schedule-options">
          <Button onClick={addSchedule}>Create Schedule</Button>
          <Button onClick={gotoPresetPage}>Check Preset List</Button>
        </div>
      ]
    }
  }, [scheduleList])

  return <div className="flex flex-col items-stretch gap-y-3 px-4">
    <h2>
      What's my today schedule?
    </h2>
    {displaySchedule}
  </div>
}