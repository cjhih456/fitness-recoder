import { useNavigate, useParams } from 'react-router-dom'
import { HeaderHandler } from '../../components/provider/Header/useHeaderContext'
import { useEffect, useMemo, useState } from 'react'
import ScheduleListEditor from '../../components/Schedule/ScheduleListEditor'
import { Button } from '@nextui-org/react'
import { useLazyGetExercisePresetById } from '../../service/GqlStore/ExercisePreset'
import { useLazyGetExerciseListByExercisePresetId } from '../../service/GqlStore/Exercise'
import { useUpdateExerciseListByExercisePreset } from '../../service/GqlStore/mixed/useUpdateExerciseListByExercisePreset'


export default function PresetDetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const id = useMemo(() => params.id, [params])
  const [loadExercisePreset] = useLazyGetExercisePresetById()
  const [loadExerciseByExercisePreset] = useLazyGetExerciseListByExercisePresetId()
  const updateExerciseList = useUpdateExerciseListByExercisePreset()
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

  HeaderHandler(header)

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