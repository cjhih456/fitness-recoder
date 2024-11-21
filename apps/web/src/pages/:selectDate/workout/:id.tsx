import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@nextui-org/react'
import dayjs from '../../../hooks/dayjs'
import ExerciseDataList from '../../../components/ExerciseData/ExerciseDataList'
import { useAlert } from '../../../components/provider/Alert/useAlert'
import { HeaderHandler, HeaderMenuHandler } from '../../../components/provider/Header/HeaderHandler'
import { useLazyGetScheduleById, useUpdateSchedule } from '../../../service/GqlStore/Schedule'
import { ScheduleType } from '../../../components/utils'
import { useTranslation } from 'react-i18next'
import { LogEvent } from '../../../service/firebase'
import { useCloneSchedule } from '../../../service/GqlStore/Schedule'
import { useSaveScheduleAsExercisePreset } from '../../../service/GqlStore/ExercisePreset'
import PresetNameInputDialog from '../../../components/Preset/PresetNameInputDialog'
import { Schedule } from 'fitness-struct'

export default function DisplayWorkout() {
  const { t } = useTranslation(['workout', 'error'])
  const { id } = useParams()
  const navigate = useNavigate()
  const alert = useAlert()
  const [getSchedule] = useLazyGetScheduleById()
  const [lazySchedule, updateLazySchedule] = useState<Schedule.Schedule | undefined>()
  const [updateSchedule] = useUpdateSchedule()
  const [cloneSchedule] = useCloneSchedule()
  const [saveScheduleAsExercisePreset] = useSaveScheduleAsExercisePreset()


  const [isSaveScheduleAsPresetOpen, setSaveScheduleAsPresetOpen] = useState(false)
  function makeAsPreset() {
    setSaveScheduleAsPresetOpen(true)
  }

  async function saveScheduleAsPreset(v: boolean, presetName?: string) {
    console.log(v, presetName)
    if (!presetName) return
    if (!v) return
    setSaveScheduleAsPresetOpen(!v)
    const result = await saveScheduleAsExercisePreset({ variables: { scheduleId: Number(id), name: presetName } })
    if (result.data?.saveScheduleAsExercisePreset) {
      navigate(`/preset/${result.data.saveScheduleAsExercisePreset.id}`)
    } else {
      alert.showAlert('ERROR', 'Save Schedule As Preset Failed', false)
    }
  }

  async function cloneAsSchedule() {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()
    const result = await cloneSchedule({ variables: { id: Number(id), targetDate: { year, month, date } } })
    if (result.data?.cloneSchedule) {
      const id = result.data.cloneSchedule.id
      alert.showAlert(
        'SUCCESS',
        'Clone Schedule Success',
        false,
        { message: 'Goto Workout', colorClass: 'text-green-500' },
        { message: 'Cancel', colorClass: 'text-red-500' }
      ).then((value) => {
        if (value) navigate(`/${year}-${month}-${date}/workout/${id}`)
      })
    }
  }
  function shareSchedule() {
    alert.showAlert('ERROR', 'On Featured process', false)
    // TODO: schedule data as json
    // TODO: encode json as base64
    // TODO: make QR code

  }

  // Load Data 
  useEffect(() => {
    LogEvent('visit_workout')

    getSchedule({ variables: { id: Number(id) } }).then((result) => {
      if (!result.data?.getScheduleById) {
        alert.showAlert('WARNING', t('error:wrong.schedule'), false).then(() => {
          navigate('/')
        })
      } else {
        const obj = result.data?.getScheduleById
        // @ts-ignore
        delete obj.__typename
        updateLazySchedule(obj)
      }
    })
    return () => {
      LogEvent('exit_workout')
      if (lazySchedule) {
        updateSchedule({
          variables: { updateSchedule: lazySchedule }
        })
      }
    }
  }, [id])

  const headerMenuList = useMemo(() => lazySchedule?.type === 'FINISH' ? [
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
  ] : [], [lazySchedule])
  HeaderMenuHandler(headerMenuList)

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

  HeaderHandler([timer])

  function updateState(type: Schedule.IType) {
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
      return <Button onClick={pauseSchedule}>{t('actionBtn.pause')}</Button>
    } else {
      return <Button onClick={startSchedule}>{t('actionBtn.start')}</Button>
    }
  }, [lazySchedule])

  return <>
    <div className="flex flex-col">
      <div className="px-4">
        {id && lazySchedule && <ExerciseDataList key={id} schedule={lazySchedule} readonly={lazySchedule?.type === ScheduleType.FINISH}></ExerciseDataList>}
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