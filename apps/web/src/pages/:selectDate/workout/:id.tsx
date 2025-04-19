import type { Schedule } from '@fitness/struct'
import { Button } from '@heroui/react'
import { useAnimationFrame } from 'framer-motion'
import { Suspense, useEffect, useMemo, useOptimistic } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import ExerciseDataItem from '@entities/exercise/ui/ExerciseDataItem'
import PresetNameInputDialog from '@entities/exercisePreset/ui/PresetNameInputDialog'
import { useGetScheduleById } from '@entities/schedule/api'
import useScheduleTimeFragment from '@entities/schedule/api/useScheduleTimeFragment'
import { useScheduleHeaderMenu } from '@entities/schedule/hooks'
import useScheduleTypeActions from '@entities/schedule/hooks/useScheduleTypeActions'
import { ScheduleType } from '@entities/schedule/model/ScheduleType'
import ExerciseDataList from '@features/exercise/ui/ExerciseDataList'
import SetListEditor from '@features/set/ui/SetListEditor'
import { useHeaderSetValue } from '@shared/hooks/header'
import usePageTracker from '@shared/hooks/usePageTracker'
import { formatTime } from '@shared/lib/formatter'
import { BooleanRender } from '@shared/ui/StateRender'
import { BottomNaviArea } from '@widgets/bottomNavi'

export default function DisplayWorkout() {
  const { t } = useTranslation(['workout', 'error'])
  const { id: idParam } = useParams()
  usePageTracker('workout_detail')
  const scheduleId = useMemo(() => Number(idParam) || 0, [idParam])
  const navigate = useNavigate()

  useGetScheduleById(scheduleId)
  const schedule = useScheduleTimeFragment(scheduleId)
  const [lazySchedule, updateLazySchedule] = useOptimistic<ScheduleStoreType, Partial<Schedule.Data>>(
    schedule,
    (prev, update) => {
      return {
        ...prev,
        ...update
      }
    }
  )
  const setHeader = useHeaderSetValue()

  const { startSchedule, pauseSchedule, finishSchedule, calcTime } = useScheduleTypeActions({
    schedule: schedule,
    updateLazySchedule
  })

  // initations
  useEffect(() => {
    setHeader(formatTime(calcTime(lazySchedule)))
  }, [lazySchedule, setHeader, calcTime])

  /** display formated duration time */
  useAnimationFrame(() => {
    if (!lazySchedule) return
    if (lazySchedule.type !== ScheduleType.STARTED) return
    setHeader(formatTime(calcTime(lazySchedule)))
  })

  const [isSaveScheduleAsPresetOpen, saveScheduleAsPreset] = useScheduleHeaderMenu(lazySchedule)

  return <>
    <div className="flex flex-col pt-4">
      <div className="px-4">
        <Suspense>
          <ExerciseDataList scheduleId={scheduleId}>
            {({ exercise }) => <ExerciseDataItem exerciseId={exercise.id} fitnessName={exercise.fitness?.name}>
              <SetListEditor exerciseDataId={exercise.id} readonly={lazySchedule?.type === ScheduleType.FINISH} />
            </ExerciseDataItem>}
          </ExerciseDataList>
        </Suspense>
      </div>
    </div>
    <BooleanRender
      state={lazySchedule.type !== ScheduleType.FINISH}
      render={{
        true: () => <BottomNaviArea className="grid grid-cols-2 gap-x-4 p-4">
          <BooleanRender
            state={lazySchedule.type === ScheduleType.STARTED}
            render={{
              true: () => <Button onPress={() => pauseSchedule()}>{t('actionBtn.pause')}</Button>,
              false: () => <Button onPress={() => startSchedule()}>{t('actionBtn.start')}</Button>
            }}
          />
          <Button onPress={() => finishSchedule().then(() => navigate(-1))}>{t('actionBtn.finish')}</Button>
        </BottomNaviArea>
      }}
    />
    <PresetNameInputDialog isOpen={isSaveScheduleAsPresetOpen} onChange={saveScheduleAsPreset} />
  </>
}