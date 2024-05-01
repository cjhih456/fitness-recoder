import { Button } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ScheduleListEditor from '../../../components/Schedule/ScheduleListEditor';
import useScheduleStore from '../../../service/Store/ScheduleStoreHooks';

export default function CreateSchedule() {
  const navigate = useNavigate()
  const { selectDate } = useParams()
  const scheduleStore = useScheduleStore()
  const [year, month, date] = useMemo(() => selectDate && selectDate.split('-').map(v => +v) || [0, 0, 0], [selectDate])

  const [exerciseIdxList, changeExerciseIdxList] = useState<number[]>([])
  function startFitnessTime() {
    if (!selectDate) return
    const scheduleIdx = scheduleStore.createSchedule(year, month, date)

    scheduleStore.addExerciseListByScheduleWithExerciseData(scheduleIdx || '', exerciseIdxList)
    navigate('/')
  }

  return <ScheduleListEditor exerciseIdxList={exerciseIdxList} onChangeExerciseIdxList={changeExerciseIdxList}>
    <Button onClick={startFitnessTime}>Save Exercise</Button>
  </ScheduleListEditor>
}
