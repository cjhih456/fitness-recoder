import { Button } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Schedule } from '../../../service/Store/Schedule';
import { useScheduleStore } from '../../../service/Store/ScheduleStore';
import ScheduleListEditor from '../../../components/Schedule/ScheduleListEditor';

export default function CreateSchedule() {
  const { selectDate } = useParams()
  const navigate = useNavigate()
  const scheduleStore = useScheduleStore()
  const [year, month, date] = useMemo(() => selectDate && selectDate.split('-').map(v => +v) || [0, 0, 0], [selectDate])

  const [exerciseList, changeExerciseList] = useState<IExercise[]>([])
  function startFitnessTime() {
    if (!selectDate) return
    const schedule = new Schedule(year, month, date)
    schedule.addExercise(exerciseList.map(v => ({
      exercise: v,
      sets: []
    }) as ExerciseData))
    scheduleStore.setScheduleData(schedule)
    navigate('/')
  }

  return <ScheduleListEditor exerciseList={exerciseList} onChangeExerciseList={changeExerciseList}>
    <Button onClick={startFitnessTime}>Save Exercise</Button>
  </ScheduleListEditor>
}
