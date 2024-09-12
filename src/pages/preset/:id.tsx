import { useParams } from 'react-router-dom'
import { HeaderHandler } from '../../components/provider/Header/useHeaderContext'
import { useEffect, useMemo, useState } from 'react'
import ScheduleListEditor from '../../components/Schedule/ScheduleListEditor'
import { Button } from '@nextui-org/react'
import { useLazyGetExercisePresetById } from '../../service/GqlStore/ExercisePreset'
import { useLazyGetExerciseListByExercisePresetId } from '../../service/GqlStore/Exercise'


export default function PresetDetailPage() {
  const params = useParams()
  const id = useMemo(() => params.id, [params])
  const [loadExercisePreset] = useLazyGetExercisePresetById()
  const [loadExerciseByExercisePreset] = useLazyGetExerciseListByExercisePresetId()
  const [exercisePreset, setExercisePreset] = useState<ExercisePreset | undefined>()
  const [exerciseIdxList, changeExerciseIdxList] = useState<number[]>([])
  useEffect(() => {
    loadExercisePreset({ variables: { id: Number(id) } }).then((result) => {
      if (result.data) {
        setExercisePreset(result.data?.getExercisePresetById)
      }
    })
    loadExerciseByExercisePreset({ variables: { exercisePresetId: Number(id) } }).then((result) => {
      if (result.data) {
        changeExerciseIdxList(result.data?.getExerciseListByExercisePresetId.map(v => v.exercise))
      }
    })
  }, [])

  function savePreset() {
    if (!id) return

    // scheduleStore.addExerciseListByPresetWithExerciseData(id, exerciseIdxList)
  }

  HeaderHandler([<p key="title">{exercisePreset?.name}</p>])
  return <ScheduleListEditor
    // savedIdxData={savedExerciseIdxList}
    exerciseIdxList={exerciseIdxList}
    onChangeExerciseIdxList={changeExerciseIdxList}>
    <Button onClick={savePreset}>Save Preset</Button>
  </ScheduleListEditor>
}