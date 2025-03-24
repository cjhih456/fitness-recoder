import type { Schedule } from 'fitness-struct'
import { Button } from '@heroui/react'
import { useAnimationFrame } from 'framer-motion'
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetScheduleById, useUpdateSchedule } from '@hooks/apollo/Schedule'
import usePageTracker from '@hooks/usePageTracker'
import { useScheduleHeaderMenu } from '@hooks/useScheduleMenu'
import useAlert from '@provider/Alert/hooks/useAlert'
import BottomNaviArea from '@provider/BottomNavi/component/BottomNaviArea'
import ExerciseDataList from '@ui/ExerciseData/ExerciseDataList'
import useHeaderHandler from '@ui/Header/hooks/useHeaderHandler'
import PresetNameInputDialog from '@ui/Preset/PresetNameInputDialog'
import { dayjs, ScheduleType } from '@utils'

export default function DisplayWorkout() {
  const { t } = useTranslation(['workout', 'error'])
  const { id: idParam } = useParams()
  usePageTracker('workout_detail')
  const scheduleId = useMemo(() => Number(idParam) || 0, [idParam])
  const navigate = useNavigate()
  const { showAlert } = useAlert()
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
    () => updateState(ScheduleType.FINISH, lazySchedule).then(() => navigate(-1)),
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
      showAlert({
        message: t('error:wrong.schedule')
      }).then(() => {
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
  }, [error, showAlert, t, navigate, updateLazySchedule, loadedScheduleData, lazySchedule])

  /** display formated duration time */
  useAnimationFrame(() => {
    if (!lazySchedule || lazySchedule.type !== 'STARTED') return
    setTimerText(calcTimeText(lazySchedule))
  })

  useHeaderHandler(timerText)

  const scheduleProcessBtn = useMemo(() => {
    if (lazySchedule?.type === ScheduleType.STARTED) {
      return <Button onPress={pauseSchedule}>{t('actionBtn.pause')}</Button>
    } else {
      return <Button onPress={startSchedule}>{t('actionBtn.start')}</Button>
    }
  }, [lazySchedule, pauseSchedule, startSchedule, t])

  const [isSaveScheduleAsPresetOpen, saveScheduleAsPreset] = useScheduleHeaderMenu(loadedScheduleData)

  return <>
    <div className="flex flex-col pt-4">
      <div className="px-4">
        {scheduleId && lazySchedule && <Suspense>
          <ExerciseDataList key={scheduleId} schedule={lazySchedule} readonly={lazySchedule?.type === ScheduleType.FINISH} />
        </Suspense>}
      </div>
    </div>
    {
      lazySchedule?.type !== ScheduleType.FINISH &&
      <BottomNaviArea className="grid grid-cols-2 gap-x-4 p-4">
        {scheduleProcessBtn}
        <Button onPress={finishSchedule}>{t('actionBtn.finish')}</Button>
      </BottomNaviArea>
    }
    <PresetNameInputDialog isOpen={isSaveScheduleAsPresetOpen} onChange={saveScheduleAsPreset} />
  </>
}