import { useParams } from 'react-router-dom'
import { HeaderHandler } from '../../components/provider/Header/useHeaderContext'
import { useMemo, useState } from 'react'
import { useSchedulePresetStore } from '../../service/Store/SchedulePresetStore'
import ScheduleListEditor from '../../components/Schedule/ScheduleListEditor'
import useScheduleStore from '../../service/Store/ScheduleStoreHooks'
import { Button } from '@nextui-org/react'


export default function PresetDetailPage() {
  const params = useParams()
  const scheduleStore = useScheduleStore()
  const schedulePresetStore = useSchedulePresetStore()
  const id = useMemo(() => params.id, [params])
  const schedulePreset = useMemo(() => {
    return schedulePresetStore.getSchedulePreset(id ?? '')
  }, [id, schedulePresetStore])
  const savedExerciseDataList = useMemo(() => schedulePreset?.exerciseList.map(v => scheduleStore.getExerciseData(v)).filter(Boolean) as ExerciseData[], [schedulePreset])
  const savedExerciseIdxList = useMemo(() => {
    return savedExerciseDataList.map(exercise => exercise.exercise)
  }, [schedulePreset])
  const [exerciseIdxList, changeExerciseIdxList] = useState<number[]>([])

  function savePreset() {
    if (!id) return
    console.log(exerciseIdxList)
    scheduleStore.addExerciseListByPresetWithExerciseData(id, exerciseIdxList)
  }

  HeaderHandler([<p key="title">{schedulePreset?.name}</p>])
  return <ScheduleListEditor
    savedIdxData={savedExerciseIdxList}
    exerciseIdxList={exerciseIdxList}
    onChangeExerciseIdxList={changeExerciseIdxList}>
    <Button onClick={savePreset}>Save Preset</Button>
  </ScheduleListEditor>
}