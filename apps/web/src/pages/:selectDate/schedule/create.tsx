import { Button } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import FitnessListEditor from '../../../components/Fitness/FitnessListEditor';
import { HeaderHandler } from '../../../components/provider/Header/HeaderHandler';
import { useCreateScheduleWithExercisePlans } from '../../../service/GqlStore/mixed/useCreateScheduleWithExercisePlans';
import { LogEvent } from '../../../service/firebase';
import { useAlert } from '../../../components/provider/Alert/useAlert';
import usePageTracker from '../../../hooks/usePageTracker';
import useScheduleActions from '../../../hooks/useSchedule/useScheduleActions';

const defaultSearchParams = createSearchParams({
  directStart: '0'
})

export default function CreateSchedule() {
  HeaderHandler(['Create Schedule'])
  usePageTracker('create_schedule')
  const navigate = useNavigate()
  const { gotoScheduleDetail } = useScheduleActions()
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
        gotoScheduleDetail(result?.id, `${year}-${month}-${date}`)
      } else {
        alert.showAlert('ERROR', 'Error... Something Wrong!', false)
      }
    } else {
      navigate('/')
    }
  }

  return <FitnessListEditor exerciseIdxList={exerciseIdxList} onChangeExerciseIdxList={changeExerciseIdxList}>
    <Button onClick={startFitnessTime}>Save Exercise</Button>
  </FitnessListEditor>
}
