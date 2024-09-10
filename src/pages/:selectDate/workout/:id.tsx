import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
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
  const [getSchedule] = useLazyGetScheduleById()
  const [lazySchedule, updateLazySchedule] = useState<Schedule | undefined>()
  const [updateSchedule] = useUpdateSchedule()
  const scheduleDate = useMemo(() => {
    return `${lazySchedule?.year}-${lazySchedule?.month}-${lazySchedule?.date}`
  }, [lazySchedule?.year, lazySchedule?.month, lazySchedule?.date])


  // Load Data 
  useEffect(() => {
    getSchedule({ variables: { id: Number(id) } }).then((result) => {
      if (!result.data?.getScheduleById) {
        alert.showAlert('WARNING', 'Don\'t have schedule. Please, check again', false).then(() => {
          navigate('/')
        })
      } else {
        updateLazySchedule(result.data?.getScheduleById)
      }
    })
    return () => {
      if (lazySchedule) {
        updateSchedule({
          variables: { updateSchedule: lazySchedule }
        })
      }
    }
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
      if (lazySchedule && lazySchedule.type === 'STARTED') {
        const tempSchedule = { ...lazySchedule }
        const nowTime = new Date().getTime()
        tempSchedule.workoutTimes += nowTime - (tempSchedule.beforeTime ?? tempSchedule.start)
        tempSchedule.beforeTime = nowTime
        // @ts-ignore
        delete tempSchedule.__typename
        updateLazySchedule(tempSchedule)
      }
    }, 100)
    return () => {
      clearInterval(interval)
    }
  }, [lazySchedule])

  /** display formated duration time */
  const timer = useMemo(() => {
    if (lazySchedule?.workoutTimes)
      return dayjs.duration(lazySchedule?.workoutTimes).format('HH:mm:ss.SSS')
    return '00:00:00.000'
  }, [lazySchedule])

  function updateState(type: ScheduleType) {
    if (!id) return Promise.resolve()
    if (lazySchedule) {
      const obj = {
        ...lazySchedule,
        type,
      }
      if (type === ScheduleType.STARTED) {
        obj.start = obj.beforeTime = new Date().getTime()
      }
      // @ts-ignore
      delete obj.__typename
      return updateSchedule({
        variables: { updateSchedule: obj }
      }).then(() => {
        updateLazySchedule(obj)
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
    if (lazySchedule?.type === 'STARTED') {
      return <Button onClick={pauseSchedule}>Pause Schedule</Button>
    } else {
      return <Button onClick={startSchedule}>Start Schedule</Button>
    }
  }, [lazySchedule])

  return <>
    <div className="flex flex-col">
      <div>
        {timer}
      </div>
      <div>
        {id && lazySchedule && <ExerciseDataList key={id} schedule={lazySchedule} readonly={lazySchedule?.type === ScheduleType.FINISH}></ExerciseDataList>}
      </div>
    </div>
    {
      lazySchedule?.type !== ScheduleType.FINISH &&
      <div className='absolute bottom-0 w-full left-0 right-0'>
        {scheduleProcessBtn}
        <Button onClick={finishSchedule}>Finish Schedule</Button>
      </div>
    }
  </>
}