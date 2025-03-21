import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetExerciseListByScheduleId } from '@hooks/apollo/Exercise';
import useUpdateExerciseListBySchedule from '@hooks/apollo/mixed/useUpdateExerciseListBySchedule';
import usePageTracker from '@hooks/usePageTracker';
import useHeaderHandler from '@provider/Header/hooks/useHeaderHandler';
import FitnessListEditor from '@ui/Fitness/FitnessListEditor';

export default function DisplaySchedule() {
  useHeaderHandler(['Schedule'])
  usePageTracker('modify_schedule')

  const { id: idParam } = useParams()
  const scheduleId = useMemo(() => Number(idParam) || 0, [idParam])
  const navigate = useNavigate()
  const { data: loadedData } = useGetExerciseListByScheduleId(scheduleId)
  const exerciseList = useMemo(() => loadedData?.getExerciseListByScheduleId || [], [loadedData])
  const updateExerciseList = useUpdateExerciseListBySchedule()

  const savedExerciseIdxList = useMemo(() => exerciseList.map(v => v.exercise), [exerciseList]);
  function startFitnessTime(exerciseIdxList: number[]) {
    updateExerciseList(scheduleId, exerciseList || [], exerciseIdxList)
    navigate('/')
  }

  return <FitnessListEditor
    saveBtnText='Save Exercise'
    savedIdxData={savedExerciseIdxList}
    onSaveAction={startFitnessTime}
  />
}
