import { Button } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ScheduleListEditor from '../../../components/Schedule/ScheduleListEditor';
import useScheduleStore from '../../../service/Store/ScheduleStoreHooks';

export default function CreateSchedule() {
  const { selectDate } = useParams()
  const navigate = useNavigate()
  const scheduleStore = useScheduleStore()
  const [year, month, date] = useMemo(() => selectDate && selectDate.split('-').map(v => +v) || [0, 0, 0], [selectDate])

  const [exerciseList, changeExerciseList] = useState<IExercise[]>([])
  function startFitnessTime() {
    if (!selectDate) return
    const schedule = scheduleStore.createSchedule(year, month, date)

    scheduleStore.addExercise(schedule, exerciseList.map(v => ({
      exercise: v,
      sets: []
    }) as ExerciseData))
    navigate('/')
  }

  return <ScheduleListEditor exerciseList={exerciseList} onChangeExerciseList={changeExerciseList}>
    <Button onClick={startFitnessTime}>Save Exercise</Button>
  </ScheduleListEditor>
}
