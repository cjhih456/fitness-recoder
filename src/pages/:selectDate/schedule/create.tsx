import { Button } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ScheduleListEditor from '../../../components/Schedule/ScheduleListEditor';
import { HeaderHandler } from '../../../components/provider/Header/useHeaderContext';
import { useCreateScheduleWithExercisePlans } from '../../../service/GqlStore/mixed/useCreateScheduleWithExercisePlans';
import { LogEvent } from '../../../service/firebase';
import { useAlert } from '../../../components/provider/Alert/useAlert';

const defaultSearchParams = createSearchParams({
  directStart: '0'
})

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
  const [queryParams] = useSearchParams(defaultSearchParams)
  const [year, month, date] = useMemo(() => selectDate && selectDate.split('-').map(v => +v) || [0, 0, 0], [selectDate])
  const alert = useAlert()
  const [exerciseIdxList, changeExerciseIdxList] = useState<number[]>([])

  const createScheduleWithExercisePlans = useCreateScheduleWithExercisePlans()
  async function startFitnessTime() {
    if (!selectDate) return
    LogEvent('save_new_schedule')
    const result = await createScheduleWithExercisePlans(year, month, date, exerciseIdxList)
    if (queryParams.get('directStart') === '1') {
      if (result?.id) {
        navigate(`/${year}-${month}-${date}/workout/${result?.id}`)
      } else {
        alert.showAlert('ERROR', 'Error... Something Wrong!', false)
      }
    } else {
      navigate('/')
    }
  }

  return <ScheduleListEditor exerciseIdxList={exerciseIdxList} onChangeExerciseIdxList={changeExerciseIdxList}>
    <Button onClick={startFitnessTime}>Save Exercise</Button>
  </ScheduleListEditor>
}
