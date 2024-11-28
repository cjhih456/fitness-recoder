import { useNavigate, useParams } from 'react-router-dom';
import FitnessListEditor from '../../../components/Fitness/FitnessListEditor';
import { useMemo, useState } from 'react';
import { Button } from '@nextui-org/react';
import { HeaderHandler } from '../../../components/provider/Header/HeaderHandler';
import { useGetScheduleById } from '../../../service/GqlStore/Schedule';
import { useGetExerciseListByScheduleId } from '../../../service/GqlStore/Exercise';
import { useUpdateExerciseListBySchedule } from '../../../service/GqlStore/mixed/useUpdateExerciseListBySchedule';
import usePageTracker from '../../../hooks/usePageTracker';

export default function DisplaySchedule() {
  HeaderHandler(['Schedule'])
  usePageTracker('modify_schedule')


  const { selectDate, id: idParam } = useParams()
  const scheduleId = useMemo(() => Number(idParam) || 0, [idParam])
  const navigate = useNavigate()
  const { data: selectedSchedule } = useGetScheduleById(scheduleId)
  const { data: loadedData } = useGetExerciseListByScheduleId(scheduleId)
  const savedExercise = useMemo(() => loadedData?.getExerciseListByScheduleId || [], [loadedData])
  const updateExerciseList = useUpdateExerciseListBySchedule()

  const savedExerciseIdxList = useMemo(() => savedExercise.map(v => v.exercise) || [], [savedExercise]);
  const [exerciseIdxList, changeExerciseIdxList] = useState<number[]>([])
  function startFitnessTime() {
    if (!selectDate || !selectedSchedule) return
    updateExerciseList(scheduleId, savedExercise, exerciseIdxList)
    navigate('/')
  }

  return <FitnessListEditor savedIdxData={savedExerciseIdxList} exerciseIdxList={exerciseIdxList} onChangeExerciseIdxList={changeExerciseIdxList}>
    <Button onClick={startFitnessTime}>Save Exercise</Button>
  </FitnessListEditor>
}
