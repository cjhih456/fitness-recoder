import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useScheduleActions } from '@entities/schedule/hooks';
import { useCreateScheduleWithExercisePlans } from '@features/exerciseManagement/api';
import { LogEvent } from '@service/firebase';
import usePageTracker from '@shared/hooks/usePageTracker';
import FitnessListEditor from '@ui/Fitness/FitnessListEditor';
import { useAlert } from '@widgets/alert';
import { useHeaderHandler } from '@widgets/header';

const defaultSearchParams = createSearchParams({
  directStart: '0'
})

export default function CreateSchedule() {
  useHeaderHandler('Create Schedule')
  usePageTracker('create_schedule')
  const navigate = useNavigate()
  const { gotoScheduleDetail } = useScheduleActions()
  const { selectDate } = useParams()
  const [queryParams] = useSearchParams(defaultSearchParams)
  const [year, month, date] = selectDate ? selectDate.split('-').map(v => +v) : [0, 0, 0]
  const { pushAlert } = useAlert()

  const createScheduleWithExercisePlans = useCreateScheduleWithExercisePlans()
  async function startFitnessTime(exerciseIdxList: number[]) {
    if (!selectDate) return
    LogEvent('save_new_schedule')
    const result = await createScheduleWithExercisePlans(year, month, date, exerciseIdxList)
    if (queryParams.get('directStart') === '1') {
      if (result?.id) {
        gotoScheduleDetail(result?.id, `${year}-${month}-${date}`, { replace: true })
      } else {
        pushAlert({
          message: 'Error... Something Wrong!'
        })
      }
    } else {
      navigate(-1)
    }
  }

  return <FitnessListEditor
    saveBtnText='Save Exercise'
    onSaveAction={startFitnessTime}
  />
}
