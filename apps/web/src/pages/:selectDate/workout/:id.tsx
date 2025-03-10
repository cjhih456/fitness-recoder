import type { Schedule } from 'fitness-struct'
import { Button } from '@nextui-org/react'
import { useAnimationFrame } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import ExerciseDataList from '@components/ExerciseData/ExerciseDataList'
import PresetNameInputDialog from '@components/Preset/PresetNameInputDialog'
import { useGetScheduleById, useUpdateSchedule } from '@hooks/apollo/Schedule'
import useAlert from '@hooks/provider/Alert/useAlert'
import useHeaderHandler from '@hooks/provider/Header/useHeaderHandler'
import usePageTracker from '@hooks/usePageTracker'
import { useScheduleHeaderMenu } from '@hooks/useScheduleMenu'
import { dayjs, ScheduleType } from '@utils'

export default function DisplayWorkout() {
  const { t } = useTranslation(['workout', 'error'])
  const { id: idParam } = useParams()
  usePageTracker('workout_detail')
  const scheduleId = useMemo(() => Number(idParam) || 0, [idParam])
  const navigate = useNavigate()
  const alert = useAlert()
  const { data: getScheduleData, error } = useGetScheduleById(scheduleId)
  const loadedScheduleData = useMemo(() => getScheduleData?.getScheduleById, [getScheduleData])
  const [lazySchedule, updateLazySchedule] = useState<Schedule.Schedule>()
  const [timerText, setTimerText] = useState('00:00:00.000')

  const [updateSchedule] = useUpdateSchedule()
  const updateState = useCallback((type: Schedule.IType, lazySchedule?: Schedule.Schedule) => {
    if (!lazySchedule) return Promise.resolve()
    const now = new Date().getTime()
    let workoutTimes = lazySchedule.workoutTimes
    if (lazySchedule.type === ScheduleType.STARTED) {
      workoutTimes += now - lazySchedule.beforeTime
    }
    const obj = {
      ...lazySchedule,
      type,
      beforeTime: now,
      workoutTimes: workoutTimes
    }
    updateLazySchedule(obj)
    return updateSchedule({
      variables: { updateSchedule: obj }
    })
  }, [updateLazySchedule, updateSchedule])
  const startSchedule = useCallback(
    () => updateState(ScheduleType.STARTED, lazySchedule),
    [lazySchedule, updateState]
  )
  const pauseSchedule = useCallback(
    () => updateState(ScheduleType.PAUSED, lazySchedule),
    [lazySchedule, updateState]
  )
  const finishSchedule = useCallback(
    () => updateState(ScheduleType.FINISH, lazySchedule).then(() => navigate('/')),
    [lazySchedule, updateState, navigate]
  )

  function calcTimeText(schedule: Schedule.Schedule) {
    let time = schedule.workoutTimes
    if (schedule.type === ScheduleType.STARTED) {
      const nowTime = new Date().getTime()
      time += nowTime - schedule.beforeTime
    }
    return dayjs.duration(time).format('HH:mm:ss.SSS')
  }

  // initations
  useEffect(() => {
    if (error) {
      alert.showAlert('WARNING', t('error:wrong.schedule'), false).then(() => {
        navigate('/')
      })
    } else if (loadedScheduleData) {
      if (!lazySchedule) {
        const temp = Object.create(null)
        Object.assign(temp, loadedScheduleData)
        delete temp.__typename
        updateLazySchedule(temp)
        setTimerText(calcTimeText(temp))
      }
    }
  }, [error, alert, t, navigate, updateLazySchedule, loadedScheduleData, lazySchedule])

  /** display formated duration time */
  useAnimationFrame(() => {
    if (!lazySchedule || lazySchedule.type !== 'STARTED') return
    setTimerText(calcTimeText(lazySchedule))
  })

  useHeaderHandler([timerText])

  const scheduleProcessBtn = useMemo(() => {
    if (lazySchedule?.type === ScheduleType.STARTED) {
      return <Button onClick={pauseSchedule}>{t('actionBtn.pause')}</Button>
    } else {
      return <Button onClick={startSchedule}>{t('actionBtn.start')}</Button>
    }
  }, [lazySchedule, pauseSchedule, startSchedule, t])

  const [isSaveScheduleAsPresetOpen, saveScheduleAsPreset] = useScheduleHeaderMenu(loadedScheduleData)

  return <>
    <div className="flex flex-col pt-4">
      <div className="px-4">
        {scheduleId && lazySchedule && <ExerciseDataList key={scheduleId} schedule={lazySchedule} readonly={lazySchedule?.type === ScheduleType.FINISH}></ExerciseDataList>}
      </div>
    </div>
    {
      lazySchedule?.type !== ScheduleType.FINISH &&
      <div className='absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-x-4'>
        {scheduleProcessBtn}
        <Button onClick={finishSchedule}>{t('actionBtn.finish')}</Button>
      </div>
    }
    <PresetNameInputDialog isOpen={isSaveScheduleAsPresetOpen} onChange={saveScheduleAsPreset} />
  </>
}