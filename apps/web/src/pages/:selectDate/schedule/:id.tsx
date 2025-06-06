import { useMemo, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetExerciseListByScheduleId } from '@entities/exercise/api';
import FitnessListEditor from '@entities/fitness/ui/FitnessListEditor';
import { useUpdateExerciseListBySchedule } from '@features/exercise/api';
import { useHeaderSetValue } from '@shared/hooks/header';
import usePageTracker from '@shared/hooks/usePageTracker';

export default function DisplaySchedule() {
  const setHeader = useHeaderSetValue()
  useLayoutEffect(() => {
    setHeader('Schedule')
  }, [setHeader])
  usePageTracker('modify_schedule')

  const { id: idParam } = useParams()
  const scheduleId = useMemo(() => Number(idParam) || 0, [idParam])
  const navigate = useNavigate()
  const { data } = useGetExerciseListByScheduleId(scheduleId)
  const updateExerciseList = useUpdateExerciseListBySchedule()

  const fitnessIds = data.getExerciseListByScheduleId.map(v => v.fitnessId)
  function saveSchedule(fitnessIdxList: number[]) {
    updateExerciseList(scheduleId, data.getExerciseListByScheduleId, fitnessIdxList)
    navigate(-1)
  }

  return <FitnessListEditor
    saveBtnText='Save Exercise'
    fitnessIds={fitnessIds}
    onSaveAction={saveSchedule}
  />
}
