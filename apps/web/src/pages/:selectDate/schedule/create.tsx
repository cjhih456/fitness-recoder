import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import FitnessListEditor from '@entities/fitness/ui/FitnessListEditor';
import { useScheduleActions } from '@features/schedule/hooks';
import { useSetAlert } from '@shared/hooks/alert';
import { useHeaderSetValue } from '@shared/hooks/header';
import usePageTracker from '@shared/hooks/usePageTracker';
import { LogEvent } from '@shared/lib/firebase/firebase';
import { useCreateScheduleWithExercisePlans } from '@widgets/schedule-with-exercise/api';

const defaultSearchParams = createSearchParams({
  directStart: '0'
})

export default function CreateSchedule() {
  const setHeader = useHeaderSetValue()
  setHeader('Create Schedule')
  usePageTracker('create_schedule')
  const navigate = useNavigate()
  const { gotoScheduleDetail } = useScheduleActions()
  const { selectDate } = useParams()
  const [queryParams] = useSearchParams(defaultSearchParams)
  const [year, month, date] = selectDate ? selectDate.split('-').map(v => +v) : [0, 0, 0]
  const { pushAlert } = useSetAlert()

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
