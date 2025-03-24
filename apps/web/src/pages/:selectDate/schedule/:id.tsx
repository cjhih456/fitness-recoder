import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useHeaderHandler } from '@globalUi/Header';
import { useGetExerciseListByScheduleId } from '@hooks/apollo/Exercise';
import useUpdateExerciseListBySchedule from '@hooks/apollo/mixed/useUpdateExerciseListBySchedule';
import usePageTracker from '@hooks/usePageTracker';
import FitnessListEditor from '@ui/Fitness/FitnessListEditor';

export default function DisplaySchedule() {
  useHeaderHandler('Schedule')
  usePageTracker('modify_schedule')

  const { id: idParam } = useParams()
  const scheduleId = useMemo(() => Number(idParam) || 0, [idParam])
  const navigate = useNavigate()
  const { data } = useGetExerciseListByScheduleId(scheduleId)
  const updateExerciseList = useUpdateExerciseListBySchedule()

  const savedExerciseIdxList = data.getExerciseListByScheduleId.map(v => v.exercise)
  function saveSchedule(exerciseIdxList: number[]) {
    updateExerciseList(scheduleId, savedExerciseIdxList || [], exerciseIdxList)
    navigate(-1)
  }

  return <FitnessListEditor
    saveBtnText='Save Exercise'
    savedIdxData={savedExerciseIdxList}
    onSaveAction={saveSchedule}
  />
}
