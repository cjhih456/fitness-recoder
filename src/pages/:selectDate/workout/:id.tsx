import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { Button } from '@nextui-org/react'
import dayjs from '../../../hooks/dayjs'
import ExerciseDataList from '../../../components/ExerciseData/ExerciseDataList'
import { useAlert } from '../../../components/provider/Alert/useAlert'
import { useHeaderContext } from '../../../components/provider/Header/useHeaderContext'
import { useLazyGetScheduleById, useUpdateSchedule } from '../../../service/GqlStore/Schedule'
import { ScheduleType } from '../../../service/Store/ScheduleStoreHooks'

export default function DisplayWorkout() {
  const { id } = useParams()
  const navigate = useNavigate()
  const alert = useAlert()
  const [getSchedule, { data }] = useLazyGetScheduleById()
  const [updateSchedule] = useUpdateSchedule()
  const schedule = useMemo(() => {
    return data?.getScheduleById
  }, [data])
  const scheduleDate = useMemo(() => {
    return `${schedule?.year}-${schedule?.month}-${schedule?.date}`
  }, [schedule?.year, schedule?.month, schedule?.date])


  // Load Data 
  useEffect(() => {
    getSchedule({ variables: { id: Number(id) } }).then((result) => {
      if (!result.data?.getScheduleById) {
        alert.showAlert('WARNING', 'Don\'t have schedule. Please, check again', false).then(() => {
          navigate('/')
        })
      }
    })
  }, [])

  // Set Header
  const HeaderContext = useHeaderContext()
  useEffect(() => {
    HeaderContext.setHeader([scheduleDate])
    return () => {
      HeaderContext.setHeader([])
    }
  }, [scheduleDate])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!id) return
      if (schedule && schedule.type === 'STARTED') {
        const tempSchedule = { ...schedule }
        const nowTime = new Date().getTime()
        tempSchedule.workoutTimes += nowTime - (tempSchedule.beforeTime ?? tempSchedule.start)
        tempSchedule.beforeTime = nowTime
        updateSchedule({
          variables: { updateSchedule: schedule }
        })
      }
    }, 100)
    return () => {
      clearInterval(interval)
    }
  }, [])

  /** display formated duration time */
  const timer = useMemo(() => {
    if (schedule?.workoutTimes)
      return dayjs.duration(schedule?.workoutTimes).format('HH:mm:ss.SSS')
    return '00:00:00.000'
  }, [schedule])

  function updateState(type: ScheduleType) {
    if (!id) return Promise.resolve()
    if (schedule) {
      const obj = {
        ...schedule,
        type,
      }
      // @ts-ignore
      delete obj.__typename
      return updateSchedule({
        variables: { updateSchedule: obj }
      }).then(() => {
        getSchedule({ variables: { id: Number(id) } })
      })
    } else {
      return Promise.resolve()
    }
  }

  function startSchedule() {
    updateState(ScheduleType.STARTED)
  }
  function pauseSchedule() {
    updateState(ScheduleType.PAUSED)
  }
  function finishSchedule() {
    updateState(ScheduleType.FINISH).then(() => {
      navigate('/')
    })
  }
  const scheduleProcessBtn = useMemo(() => {
    if (schedule?.type === 'STARTED') {
      return <Button onClick={pauseSchedule}>Pause Schedule</Button>
    } else {
      return <Button onClick={startSchedule}>Start Schedule</Button>
    }
  }, [schedule])

  return <>
    <div className="flex flex-col">
      <div>
        {timer}
      </div>
      <div>
        {id && schedule && <ExerciseDataList key={id} schedule={schedule} readonly={schedule?.type === ScheduleType.FINISH}></ExerciseDataList>}
      </div>
    </div>
    {
      schedule?.type !== ScheduleType.FINISH &&
      <div className='absolute bottom-0 w-full left-0 right-0'>
        {scheduleProcessBtn}
        <Button onClick={finishSchedule}>Finish Schedule</Button>
      </div>
    }
  </>
}