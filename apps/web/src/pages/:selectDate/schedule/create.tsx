import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import FitnessListEditor from '@components/Fitness/FitnessListEditor';
import useCreateScheduleWithExercisePlans from '@hooks/apollo/mixed/useCreateScheduleWithExercisePlans';
import useAlert from '@hooks/provider/Alert/useAlert';
import useHeaderHandler from '@hooks/provider/Header/useHeaderHandler';
import usePageTracker from '@hooks/usePageTracker';
import { useScheduleActions } from '@hooks/useScheduleMenu';
import { LogEvent } from '@service/firebase';

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
  const alert = useAlert()

  const createScheduleWithExercisePlans = useCreateScheduleWithExercisePlans()
  async function startFitnessTime(exerciseIdxList: number[]) {
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

  return <FitnessListEditor
    saveBtnText='Save Exercise'
    onSaveAction={startFitnessTime}
  />
}
