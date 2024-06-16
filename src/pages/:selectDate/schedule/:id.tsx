import { useNavigate, useParams } from 'react-router-dom';
import ScheduleListEditor from '../../../components/Schedule/ScheduleListEditor';
import { useMemo, useState } from 'react';
import { Button } from '@nextui-org/react';
import useScheduleStore from '../../../service/Store/ScheduleStoreHooks';
import { HeaderHandler } from '../../../components/provider/Header/useHeaderContext';

export default function DisplaySchedule() {
  HeaderHandler(['Schedule'])

  const { selectDate, id } = useParams()
  const navigate = useNavigate()
  const scheduleStore = useScheduleStore()
  const selectedSchedule = useMemo(() => scheduleStore.getSchedule(id || ''), [scheduleStore, id])
  const savedExerciseDataList = useMemo(() => selectedSchedule?.exerciseList.map(v => scheduleStore.getExerciseData(v)).filter(Boolean) as ExerciseData[], [selectedSchedule])
  const savedExerciseIdxList = useMemo(() => savedExerciseDataList.map(v => v.exercise), [savedExerciseDataList]);
  const [exerciseIdxList, changeExerciseIdxList] = useState<number[]>([])
  function startFitnessTime() {
    if (!selectDate || !selectedSchedule) return
    scheduleStore.addExerciseListByScheduleWithExerciseData(id || '', exerciseIdxList)
    navigate('/')
  }

  return <ScheduleListEditor savedIdxData={savedExerciseIdxList} exerciseIdxList={exerciseIdxList} onChangeExerciseIdxList={changeExerciseIdxList}>
    <Button onClick={startFitnessTime}>Save Exercise</Button>
  </ScheduleListEditor>
}
