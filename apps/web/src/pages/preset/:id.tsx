import { useNavigate, useParams } from 'react-router-dom'
import { HeaderHandler, HeaderMenuHandler } from '../../components/provider/Header/HeaderHandler'
import { useEffect, useMemo, useState } from 'react'
import ScheduleListEditor from '../../components/Schedule/ScheduleListEditor'
import { Button } from '@nextui-org/react'
import { useLazyGetExercisePresetById } from '../../service/GqlStore/ExercisePreset'
import { useLazyGetExerciseListByExercisePresetId } from '../../service/GqlStore/Exercise'
import { useUpdateExerciseListByExercisePreset } from '../../service/GqlStore/mixed/useUpdateExerciseListByExercisePreset'
import { useTranslation } from 'react-i18next'
import { useCloneScheduleFromPreset } from '../../service/GqlStore/Schedule'
import { useDeleteExercisePreset } from '../../service/GqlStore/ExercisePreset'


export default function PresetDetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation(['preset', 'common'])
  const id = useMemo(() => params.id, [params])
  const [loadExercisePreset] = useLazyGetExercisePresetById()
  const [loadExerciseByExercisePreset] = useLazyGetExerciseListByExercisePresetId()
  const [cloneScheduleFromPreset] = useCloneScheduleFromPreset()
  const updateExerciseList = useUpdateExerciseListByExercisePreset()
  const [deleteExercisePreset] = useDeleteExercisePreset()
  const [exercisePreset, setExercisePreset] = useState<ExercisePreset | undefined>()
  const [exerciseIdxList, changeExerciseIdxList] = useState<ExerciseData[]>([])
  const [newExerciseList, changeNewExerciseList] = useState<number[]>([])
  const oldExerciseList = useMemo(() => exerciseIdxList.map(v => v.exercise), [exerciseIdxList])

  useEffect(() => {
    loadExercisePreset({ variables: { id: Number(id) } }).then((result) => {
      if (!result.data) return
      setExercisePreset(result.data.getExercisePresetById)
    })
    loadExerciseByExercisePreset({ variables: { exercisePresetId: Number(id) } }).then((result) => {
      result.data && changeExerciseIdxList(result.data.getExerciseListByExercisePresetId)
    })
  }, [])

  const header = useMemo(() => {
    return [exercisePreset?.name]
  }, [exercisePreset])
  const headerMenu = useMemo(() => {
    return [
      {
        key: 'startWorkoutWithPreset',
        name: t('menu.startWorkoutWithPreset'),
        action: () => {
          const today = new Date()
          const year = today.getFullYear()
          const month = today.getMonth() + 1
          const date = today.getDate()

          cloneScheduleFromPreset({ variables: { presetId: Number(id), targetDate: { year, month, date } } }).then((result) => {
            result.data && navigate(`/${year}-${month}-${date}/workout/${result.data.cloneScheduleFromPreset.id}`)
          })
        }
      },
      {
        key: 'deletePreset',
        name: t('menu.deletePreset'),
        action: () => {
          deleteExercisePreset({ variables: { id: Number(id) } }).then((result) => {
            result.data && navigate('/preset')
          })
        }
      }
    ]
  }, [t])

  HeaderHandler(header)
  HeaderMenuHandler(headerMenu)
  function savePreset() {
    if (!id) return
    updateExerciseList(Number(id), exerciseIdxList, newExerciseList).finally(() => {
      navigate('/preset')
    })
  }
  return <ScheduleListEditor
    savedIdxData={oldExerciseList}
    exerciseIdxList={newExerciseList}
    onChangeExerciseIdxList={changeNewExerciseList}>
    <Button onClick={savePreset}>Save Preset</Button>
  </ScheduleListEditor>
}