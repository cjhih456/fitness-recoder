import { Button } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ScheduleListEditor from '../../../components/Schedule/ScheduleListEditor';
import { HeaderHandler } from '../../../components/provider/Header/useHeaderContext';
import { useCreateScheduleWithExercisePlans } from '../../../service/GqlStore/mixed/useCreateScheduleWithExercisePlans';
import { LogEvent } from '../../../service/firebase';

export default function CreateSchedule() {
  HeaderHandler(['Create Schedule'])
  useEffect(() => {
    LogEvent('visit_create_schedule')
    return () => {
      LogEvent('exit_create_schedule')
    }
  }, [])
  const navigate = useNavigate()
  const { selectDate } = useParams()
  const [year, month, date] = useMemo(() => selectDate && selectDate.split('-').map(v => +v) || [0, 0, 0], [selectDate])
  const [exerciseIdxList, changeExerciseIdxList] = useState<number[]>([])

  const createScheduleWithExercisePlans = useCreateScheduleWithExercisePlans()
  async function startFitnessTime() {
    if (!selectDate) return
    LogEvent('save_new_schedule')
    await createScheduleWithExercisePlans(year, month, date, exerciseIdxList)
    navigate('/')
  }

  return <ScheduleListEditor exerciseIdxList={exerciseIdxList} onChangeExerciseIdxList={changeExerciseIdxList}>
    <Button onClick={startFitnessTime}>Save Exercise</Button>
  </ScheduleListEditor>
}
