import type { Schedule } from 'fitness-struct'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import useScheduleMenu from '@hooks/useScheduleMenu'
import { useAlert } from '@provider/AlertProvider'
import { useHeaderMenuHandler } from '@provider/HeaderProvider'
import { useSaveScheduleAsExercisePreset } from '@service/GqlStore/ExercisePreset'
import { ScheduleType } from '@utils'

export default function useScheduleHeaderMenu(scheduleInfo?: Schedule.Schedule): [
  boolean,
  (_v: boolean, _presetName?: string) => Promise<void>
] {
  const { showAlert } = useAlert()
  const navigate = useNavigate()
  const { t } = useTranslation(['workout'])
  const headerMenus = useScheduleMenu()

  const [saveScheduleAsExercisePreset] = useSaveScheduleAsExercisePreset()
  const [isSaveScheduleAsPresetOpen, setSaveScheduleAsPresetOpen] = useState(false)
  function makeAsPreset() {
    setSaveScheduleAsPresetOpen(true)
  }
  async function saveScheduleAsPreset(v: boolean, presetName?: string) {
    if (!presetName || !v || !scheduleInfo) return
    setSaveScheduleAsPresetOpen(!v)
    const result = await saveScheduleAsExercisePreset({ variables: { scheduleId: scheduleInfo.id, name: presetName } })
    if (result.data?.saveScheduleAsExercisePreset) {
      navigate(`/preset/${result.data.saveScheduleAsExercisePreset.id}`)
    } else {
      showAlert('ERROR', 'Save Schedule As Preset Failed', false)
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