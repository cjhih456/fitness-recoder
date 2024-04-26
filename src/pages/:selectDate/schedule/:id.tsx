import { useNavigate, useParams } from 'react-router-dom';
import ScheduleListEditor from '../../../components/Schedule/ScheduleListEditor';
import { useScheduleStore } from '../../../service/Store/ScheduleStore';
import { useMemo, useState } from 'react';
import { Schedule } from '../../../service/Store/Schedule';
import { Button } from '@nextui-org/react';

export default function DisplaySchedule() {

  const { selectDate, id } = useParams()
  const navigate = useNavigate()
  const scheduleStore = useScheduleStore()
  const [year, month, date] = useMemo(() => selectDate && selectDate.split('-').map(v => +v) || [0, 0, 0], [selectDate])
  const selectedSchedule = useMemo(() => scheduleStore.getScheduleData(year, month, date).find(v => v.id === id), [scheduleStore, year, month, date])
  const savedExerciseList = useMemo(
    () =>
      selectedSchedule?.exerciseList.map(v => v.exercise), [selectedSchedule, id]);

  const [exerciseList, changeExerciseList] = useState<IExercise[]>([])
  function startFitnessTime() {
    if (!selectDate) return
    selectedSchedule?.addExercise(exerciseList.map(v => ({
      exercise: v,
      sets: []
    }) as ExerciseData))
    navigate('/')
  }

  return <ScheduleListEditor savedData={savedExerciseList} exerciseList={exerciseList} onChangeExerciseList={changeExerciseList}>
    <Button onClick={startFitnessTime}>Save Exercise</Button>
  </ScheduleListEditor>
}
