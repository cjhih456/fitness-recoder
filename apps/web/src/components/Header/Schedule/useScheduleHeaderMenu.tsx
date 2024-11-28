import { useCallback, useMemo, useState } from 'react'
import { HeaderMenuHandler } from '../../provider/Header/HeaderHandler'
import { useCloneSchedule } from '../../../service/GqlStore/Schedule'
import { useAlert } from '../../provider/Alert/useAlert'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSaveScheduleAsExercisePreset } from '../../../service/GqlStore/ExercisePreset'
import { Schedule } from 'fitness-struct'

export default function useScheduleHeaderMenu(scheduleId: number, scheduleInfo?: Schedule.Schedule): [
  boolean,
  (_v: boolean, _presetName?: string) => Promise<void>
] {
  const alert = useAlert()
  const navigate = useNavigate()
  const { t } = useTranslation(['workout', 'error'])
  const [cloneSchedule] = useCloneSchedule()

  const [saveScheduleAsExercisePreset] = useSaveScheduleAsExercisePreset()
  const [isSaveScheduleAsPresetOpen, setSaveScheduleAsPresetOpen] = useState(false)
  function makeAsPreset() {
    setSaveScheduleAsPresetOpen(true)
  }
  async function saveScheduleAsPreset(v: boolean, presetName?: string) {
    if (!presetName) return
    if (!v) return
    setSaveScheduleAsPresetOpen(!v)
    const result = await saveScheduleAsExercisePreset({ variables: { scheduleId: scheduleId, name: presetName } })
    if (result.data?.saveScheduleAsExercisePreset) {
      navigate(`/preset/${result.data.saveScheduleAsExercisePreset.id}`)
    } else {
      alert.showAlert('ERROR', 'Save Schedule As Preset Failed', false)
    }
  }
  const cloneAsSchedule = useCallback(async () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()
    const result = await cloneSchedule({ variables: { id: scheduleId, targetDate: { year, month, date } } })
    if (result.data?.cloneSchedule) {
      const clonedScheduleId = result.data.cloneSchedule.id
      alert.showAlert(
        'SUCCESS',
        'Clone Schedule Success',
        false,
        { message: 'Goto Workout', colorClass: 'text-green-500' },
        { message: 'Cancel', colorClass: 'text-red-500' }
      ).then((value) => {
        if (value) navigate(`/${year}-${month}-${date}/workout/${clonedScheduleId}`)
      })
    }
  }, [cloneSchedule, alert, scheduleId, navigate])

  const shareSchedule = useCallback(() => {
    alert.showAlert('ERROR', 'On Featured process', false)
    // TODO: schedule data as json
    // TODO: encode json as base64
    // TODO: make QR code
  }, [alert])

  const headerMenuList = useMemo(() => scheduleInfo?.type === 'FINISH' ? [
    {
      key: 'make',
      name: t('actionBtn.make'),
      action: makeAsPreset
    },
    {
      key: 'clone',
      name: t('actionBtn.clone'),
      action: cloneAsSchedule
    },
    {
      key: 'share',
      name: t('actionBtn.share'),
      action: shareSchedule
    }
  ] : [], [scheduleInfo, t, cloneAsSchedule, shareSchedule])
  HeaderMenuHandler(headerMenuList)

  return [isSaveScheduleAsPresetOpen, saveScheduleAsPreset]
}