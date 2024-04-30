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
  const savedExerciseList = useMemo(
    () =>
      selectedSchedule?.exerciseList.map(v => v.exercise), [selectedSchedule, id]);

  const [exerciseList, changeExerciseList] = useState<IExercise[]>([])
  function startFitnessTime() {
    if (!selectDate || !selectedSchedule) return
    scheduleStore.addExercise(id || '', exerciseList.map(v => ({
      exercise: v,
      sets: []
    }) as ExerciseData))
    navigate('/')
  }

  return <ScheduleListEditor savedData={savedExerciseList} exerciseList={exerciseList} onChangeExerciseList={changeExerciseList}>
    <Button onClick={startFitnessTime}>Save Exercise</Button>
  </ScheduleListEditor>
}
