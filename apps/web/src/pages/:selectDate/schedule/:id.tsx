import { useNavigate, useParams } from 'react-router-dom';
import FitnessListEditor from '../../../components/Fitness/FitnessListEditor';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@nextui-org/react';
import { HeaderHandler } from '../../../components/provider/Header/HeaderHandler';
import { useGetScheduleById } from '../../../service/GqlStore/Schedule';
import { useLazyGetExerciseListByScheduleId } from '../../../service/GqlStore/Exercise';
import { useUpdateExerciseListBySchedule } from '../../../service/GqlStore/mixed/useUpdateExerciseListBySchedule';
import { LogEvent } from '../../../service/firebase';
import { Exercise } from 'fitness-struct';

export default function DisplaySchedule() {
  HeaderHandler(['Schedule'])

  const { selectDate, id: idParam } = useParams()
  const scheduleId = useMemo(() => Number(idParam) || 0, [idParam])
  const navigate = useNavigate()
  const { data: selectedSchedule } = useGetScheduleById(scheduleId)
  const [loadExerciseList] = useLazyGetExerciseListByScheduleId()
  const updateExerciseList = useUpdateExerciseListBySchedule()
  const [savedExercise, setSavedExercise] = useState<Exercise.Data[]>([])
  useEffect(() => {
    LogEvent('visit_schedule_detail')
    loadExerciseList({ variables: { scheduleId: scheduleId } }).then((result) => {
      if (result.data) {
        setSavedExercise(result.data?.getExerciseListByScheduleId)
      }
    })
    return () => {
      LogEvent('exit_schedule_detail')
    }
  }, [])
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
