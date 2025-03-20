import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useCreateScheduleWithExercisePlans from '@hooks/apollo/mixed/useCreateScheduleWithExercisePlans';
import usePageTracker from '@hooks/usePageTracker';
import { useScheduleActions } from '@hooks/useScheduleMenu';
import useAlert from '@provider/Alert/hooks/useAlert';
import useHeaderHandler from '@provider/Header/hooks/useHeaderHandler';
import { LogEvent } from '@service/firebase';
import FitnessListEditor from '@ui/Fitness/FitnessListEditor';

const defaultSearchParams = createSearchParams({
  directStart: '0'
})

export default function CreateSchedule() {
  useHeaderHandler(['Create Schedule'])
  usePageTracker('create_schedule')
  const navigate = useNavigate()
  const { gotoScheduleDetail } = useScheduleActions()
  const { selectDate } = useParams()
  const [queryParams] = useSearchParams(defaultSearchParams)
  const [year, month, date] = selectDate ? selectDate.split('-').map(v => +v) : [0, 0, 0]
  const { showAlert } = useAlert()

  const createScheduleWithExercisePlans = useCreateScheduleWithExercisePlans()
  async function startFitnessTime(exerciseIdxList: number[]) {
    if (!selectDate) return
    LogEvent('save_new_schedule')
    const result = await createScheduleWithExercisePlans(year, month, date, exerciseIdxList)
    if (queryParams.get('directStart') === '1') {
      if (result?.id) {
        gotoScheduleDetail(result?.id, `${year}-${month}-${date}`, { replace: true })
      } else {
        showAlert({
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
