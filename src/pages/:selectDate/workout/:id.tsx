import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import useScheduleStore from '../../../service/Store/ScheduleStoreHooks'
import { Button } from '@nextui-org/react'
import dayjs from '../../../hooks/dayjs'
import ExerciseDataList from '../../../components/ExerciseData/ExerciseDataList'
import { useAlert } from '../../../components/provider/Alert/useAlert'

export default function DisplayWorkout() {
  const { id } = useParams()
  const navigate = useNavigate()
  const scheduleStore = useScheduleStore()
  const alert = useAlert()
  const schedule = useMemo<Schedule | undefined>(() => scheduleStore.getSchedule(id || ''), [scheduleStore, id])
  useEffect(() => {
    if (!schedule) {
      alert.showAlert('WARNING', 'Don\'t have schedule. Please, check again', false).then(() => {
        navigate('/')
      })
      return
    }
    const interval = setInterval(() => {
      if (!id) return
      scheduleStore.updateScheduleTimer(id)
    }, 100)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const scheduleDate = useMemo(() => {
    return `${schedule?.year}-${schedule?.month}-${schedule?.date}`
  }, [schedule])

  /** display formated duration time */
  const timer = useMemo(() => {
    if (schedule?.workoutTimes)
      return dayjs.duration(schedule?.workoutTimes).format('HH:mm:ss.SSS')
    return '00:00:00.000'
  }, [schedule])

  function startSchedule() {
    if (!id) return
    scheduleStore.startSchedule(id)
  }
  function pauseSchedule() {
    if (!id) return
    scheduleStore.pauseSchedule(id)
  }
  function finishSchedule() {
    if (!id) return

    // TODO: need confirm when schedule have not finished set
    scheduleStore.successSchedule(id)
    navigate('/')
  }
  const scheduleProcessBtn = useMemo(() => {
    if (schedule?.type === 'STARTED') {
      return <Button onClick={pauseSchedule}>Pause Schedule</Button>
    } else {
      return <Button onClick={startSchedule}>Start Schedule</Button>
    }
  }, [schedule])

  return <div className='relative pt-16 h-screen'>
    <div className="absolute top-0 left-0 right-0 h-16 flex justify-center items-center">
      {scheduleDate}
    </div>
    <div className="flex flex-col">
      <div>
        {timer}
      </div>
      <div>
        {id && schedule && <ExerciseDataList key={id} scheduleIdx={id}></ExerciseDataList>}
      </div>
    </div>

    <div className='absolute bottom-0 w-full left-0 right-0'>
      {scheduleProcessBtn}
      <Button onClick={finishSchedule}>Finish Schedule</Button>
    </div>
  </div>
}