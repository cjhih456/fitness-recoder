import type { Schedule } from 'fitness-struct'
import { Button } from '@heroui/react'
import { useAnimationFrame } from 'framer-motion'
import { startTransition, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import ExerciseDataList from '@entities/exercise/ui/ExerciseDataList'
import PresetNameInputDialog from '@entities/exercisePreset/ui/PresetNameInputDialog'
import { useGetScheduleById, useUpdateSchedule } from '@entities/schedule/api'
import { useScheduleHeaderMenu } from '@entities/schedule/hooks'
import { ScheduleType } from '@entities/schedule/model/ScheduleType'
import usePageTracker from '@shared/hooks/usePageTracker'
import { dayjs } from '@shared/lib/utils'
import { useAlert } from '@widgets/alert';
import { BottomNaviArea } from '@widgets/bottomNavi'
import { useHeaderHandler } from '@widgets/header'

export default function DisplayWorkout() {
  const { t } = useTranslation(['workout', 'error'])
  const { id: idParam } = useParams()
  usePageTracker('workout_detail')
  const scheduleId = useMemo(() => Number(idParam) || 0, [idParam])
  const navigate = useNavigate()
  const { pushAlert } = useAlert()
  const { data: getScheduleData, error } = useGetScheduleById(scheduleId)
  const loadedScheduleData = useMemo(() => getScheduleData?.getScheduleById, [getScheduleData])
  const [lazySchedule, updateLazySchedule] = useState<Schedule.Schedule>()
  const [timerText, setTimerText] = useState('00:00:00.000')
  useHeaderHandler(timerText)

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
      pushAlert({
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
  }, [error, pushAlert, t, navigate, updateLazySchedule, loadedScheduleData, lazySchedule])

  /** display formated duration time */
  useAnimationFrame(() => {
    if (!lazySchedule || lazySchedule.type !== 'STARTED') return
    startTransition(() => {
      setTimerText(calcTimeText(lazySchedule))
    })
  })

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