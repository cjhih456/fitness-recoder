import { useNavigate, useParams } from 'react-router-dom';
import ScheduleListEditor from '../../../components/Schedule/ScheduleListEditor';
import { useMemo, useState } from 'react';
import { Button } from '@nextui-org/react';
import useScheduleStore from '../../../service/Store/ScheduleStoreHooks';

export default function DisplaySchedule() {

  const { selectDate, id } = useParams()
  const navigate = useNavigate()
  const scheduleStore = useScheduleStore()
  const selectedSchedule = useMemo(() => scheduleStore.getSchedule(id || ''), [scheduleStore, id])
  const savedExerciseIdxList = useMemo(
    () =>
      selectedSchedule?.exerciseList.map(v => v.exercise), [selectedSchedule, id]);
  /**
   * exerciseIndexList
   */
  const [exerciseIdxList, changeExerciseIdxList] = useState<number[]>([])
  function startFitnessTime() {
    if (!selectDate || !selectedSchedule) return
    scheduleStore.addExercise(id || '', exerciseIdxList.map(v => ({
      exercise: v,
      sets: []
    }) as ExerciseData))
    navigate('/')
  }

  return <ScheduleListEditor savedIdxData={savedExerciseIdxList} exerciseIdxList={exerciseIdxList} onChangeExerciseIdxList={changeExerciseIdxList}>
    <Button onClick={startFitnessTime}>Save Exercise</Button>
  </ScheduleListEditor>
}
