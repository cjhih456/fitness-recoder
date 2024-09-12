import { useNavigate, useParams } from 'react-router-dom';
import ScheduleListEditor from '../../../components/Schedule/ScheduleListEditor';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@nextui-org/react';
import { HeaderHandler } from '../../../components/provider/Header/useHeaderContext';
import { useGetScheduleById } from '../../../service/GqlStore/Schedule';
import { useLazyGetExerciseListByScheduleId } from '../../../service/GqlStore/Exercise';
import { useUpdateExerciseListBySchedule } from '../../../service/GqlStore/mixed/useUpdateExerciseListBySchedule';

export default function DisplaySchedule() {
  HeaderHandler(['Schedule'])

  const { selectDate, id } = useParams()
  const navigate = useNavigate()
  const { data: selectedSchedule } = useGetScheduleById(Number(id || 0))
  const [loadExerciseList] = useLazyGetExerciseListByScheduleId()
  const updateExerciseList = useUpdateExerciseListBySchedule()
  const [savedExercise, setSavedExercise] = useState<ExerciseData[]>([])
  useEffect(() => {
    loadExerciseList({ variables: { scheduleId: Number(id || 0) } }).then((result) => {
      if (result.data) {
        setSavedExercise(result.data?.getExerciseListByScheduleId)
      }
    })
  }, [])
  const savedExerciseIdxList = useMemo(() => savedExercise.map(v => v.exercise) || [], [savedExercise]);
  const [exerciseIdxList, changeExerciseIdxList] = useState<number[]>([])
  function startFitnessTime() {
    if (!selectDate || !selectedSchedule) return
    updateExerciseList(Number(id || 0), exerciseIdxList)
    navigate('/')
  }

  return <ScheduleListEditor savedIdxData={savedExerciseIdxList} exerciseIdxList={exerciseIdxList} onChangeExerciseIdxList={changeExerciseIdxList}>
    <Button onClick={startFitnessTime}>Save Exercise</Button>
  </ScheduleListEditor>
}
