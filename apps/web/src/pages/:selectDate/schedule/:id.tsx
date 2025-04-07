import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetExerciseListByScheduleId } from '@entities/exercise/api';
import FitnessListEditor from '@entities/fitness/ui/FitnessListEditor';
import useUpdateExerciseListBySchedule from '@features/scheduleManagement/api/useUpdateExerciseListBySchedule';
import usePageTracker from '@shared/hooks/usePageTracker';
import { useHeaderHandler } from '@widgets/header';

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
