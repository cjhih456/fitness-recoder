import type { Schedule } from '@fitness/struct'
import { startTransition, useCallback } from 'react'
import { calcTimeDiff } from '@shared/lib/formatter'
import { useUpdateSchedule } from '../api'
import { ScheduleType } from '../model/ScheduleType'

type ScheduleTypeActionsProps = {
  schedule: ScheduleStoreType
  updateLazySchedule: (_obj: Partial<ScheduleStoreType>) => void
}

export default function useScheduleTypeActions({
  schedule,
  updateLazySchedule
}: ScheduleTypeActionsProps) {
  const [updateSchedule] = useUpdateSchedule()

  const calcTime = useCallback((schedule: Schedule.Data, now?: number) => {
    let time = schedule.workoutTimes
    if (schedule.type === ScheduleType.STARTED) {
      time += calcTimeDiff(schedule.beforeTime, now)
    }
    return time
  }, [])

  const updateState = useCallback((type: Schedule.Data['type']) => {
    if (!schedule) return Promise.resolve()
    const now = new Date().getTime()
    const obj = {
      type,
      beforeTime: now,
      workoutTimes: calcTime(schedule, now)
    }
    startTransition(() => {
      updateLazySchedule(obj)
    })
    const temp = {
      ...schedule,
      ...obj
    } as ScheduleStoreType
    delete temp.__typename

    return updateSchedule({
      variables: {
        updateSchedule: temp
      }
    })
  }, [updateLazySchedule, updateSchedule, calcTime, schedule])

  const startSchedule = useCallback(
    () => updateState(ScheduleType.STARTED),
    [updateState]
  )
  const pauseSchedule = useCallback(
    () => updateState(ScheduleType.PAUSED),
    [updateState]
  )
  const finishSchedule = useCallback(
    () => updateState(ScheduleType.FINISH),
    [updateState]
  )
  return {
    startSchedule,
    pauseSchedule,
    finishSchedule,
    calcTime
  }
}