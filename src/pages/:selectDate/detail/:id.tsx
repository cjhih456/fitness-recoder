import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useScheduleStore from '../../../service/Store/ScheduleStoreHooks';
import { useAlert } from '../../../components/provider/Alert/useAlert';
import ExerciseDataList from '../../../components/ExerciseData/ExerciseDataList';

export default function DisplayDetail() {
  const { id } = useParams()
  const alert = useAlert()
  const navigate = useNavigate()
  const scheduleStore = useScheduleStore()
  const schedule = useMemo(() => scheduleStore.getSchedule(id || ''), [scheduleStore, id])
  useEffect(() => {
    if (!schedule) {
      alert.showAlert('WARNING', 'Don\'t have schedule. Please, check again', false).then(() => {
        navigate('/')
      })
      return
    }
  }, [])


  return <div>
    <ExerciseDataList scheduleIdx={id || ''} readonly></ExerciseDataList>
  </div>
}