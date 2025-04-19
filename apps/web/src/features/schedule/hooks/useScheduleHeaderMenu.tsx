import type { Schedule } from '@fitness/struct'
import { useLayoutEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ScheduleType } from '@entities/schedule/model/ScheduleType';
import { useCopyExercisePresetFromSchedule } from '@features/exercisePreset/api'
import { useSetAlert } from '@shared/hooks/alert';
import { useHeaderMenuSetValue } from '@shared/hooks/header';
import useScheduleMenu from './useScheduleMenu';

export default function useScheduleHeaderMenu(scheduleInfo?: Schedule.Data): [
  boolean,
  (_v: boolean, _presetName?: string) => Promise<void>
] {
  const { pushAlert } = useSetAlert()
  const navigate = useNavigate()
  const { t } = useTranslation(['workout'])
  const headerMenus = useScheduleMenu()

  const [copyExercisePresetFromSchedule] = useCopyExercisePresetFromSchedule()
  const [isSaveScheduleAsPresetOpen, setSaveScheduleAsPresetOpen] = useState(false)
  function makeAsPreset() {
    setSaveScheduleAsPresetOpen(true)
  }
  async function saveScheduleAsPreset(v: boolean, presetName?: string) {
    if (!presetName || !v || !scheduleInfo) return
    setSaveScheduleAsPresetOpen(!v)
    const result = await copyExercisePresetFromSchedule({ variables: { scheduleId: scheduleInfo.id, name: presetName } })
    if (result.data?.copyExercisePresetFromSchedule) {
      navigate(`/preset/${result.data.copyExercisePresetFromSchedule.id}`)
    } else {
      pushAlert({
        message: 'Save Schedule As Preset Failed'
      })
    }
  }

  const headerMenuList = useMemo(() => scheduleInfo?.type === ScheduleType.FINISH ? [
    {
      key: 'make',
      name: t('actionBtn.make'),
      action: makeAsPreset
    },
    ...headerMenus
  ] : [], [scheduleInfo, t, headerMenus])
  const setHeaderMenu = useHeaderMenuSetValue()
  useLayoutEffect(() => {
    setHeaderMenu(headerMenuList)
  }, [headerMenuList, setHeaderMenu])

  return [isSaveScheduleAsPresetOpen, saveScheduleAsPreset]
}