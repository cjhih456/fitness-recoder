import type { Schedule } from 'fitness-struct'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCopyExercisePresetFromSchedule } from '@entities/exercisePreset/api'
import { ScheduleType } from '@entities/schedule/model/ScheduleType';
import { useAlert } from '@widgets/alert';
import { useHeaderMenuHandler } from '@widgets/header';
import useScheduleMenu from './useScheduleMenu';

export default function useScheduleHeaderMenu(scheduleInfo?: Schedule.Schedule): [
  boolean,
  (_v: boolean, _presetName?: string) => Promise<void>
] {
  const { pushAlert } = useAlert()
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
  useHeaderMenuHandler(headerMenuList)

  return [isSaveScheduleAsPresetOpen, saveScheduleAsPreset]
}