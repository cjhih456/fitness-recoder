import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import useScheduleStore from '../../../service/Store/ScheduleStoreHooks'
import { Button } from '@nextui-org/react'

export default function DisplayWorkout() {
  const { id } = useParams()
  const navigate = useNavigate()
  const scheduleStore = useScheduleStore()
  const schedule = useMemo(() => scheduleStore.getSchedule(id || ''), [scheduleStore, id])
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | undefined>(undefined)
  useEffect(() => {
    if (!schedule) {
      alert('Don\'t have schedule. Please, check again')
      navigate('/')
      return
    }
    setTimerInterval(setInterval(() => {
      if (!id) return
      scheduleStore.updateScheduleTimer(id)
    }, 100))
    return () => {
      clearTimeout(timerInterval)
    }
  }, [])
  function startSchedule() {
    if (!id) return
    scheduleStore.startSchedule(id)
  }
  function pauseSchedule() {
    if (!id) return
    scheduleStore.pauseSchedule(id)
  }
  const timer = useMemo(() => schedule?.workoutTimes, [schedule?.workoutTimes])
  return <div>
    {timer}
    <div>
      <Button onClick={startSchedule}>Start Schedule</Button>
      <Button onClick={pauseSchedule}>Pause Schedule</Button>
    </div>
  </div>
}