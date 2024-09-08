import ScheduleDisplay from './ScheduleDisplay';
import { useEffect, useMemo } from 'react';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { ScheduleType } from '../../service/Store/ScheduleStoreHooks';
import { useLazyScheduleByDate } from '../../service/GqlStore/Schedule';

export interface ScheduleListProps {
  choosenDate: string
}

export default function ScheduleList({ choosenDate }: ScheduleListProps) {
  const navigate = useNavigate()
  const [loadScheduleList, { data: scheduleList }] = useLazyScheduleByDate()
  useEffect(() => {
    const [year, month, date] = choosenDate.split('-').map(v => +v)
    if (year && month && date)
      loadScheduleList({
        variables: {
          year, month, date
        }
      })
  }, [choosenDate, loadScheduleList])

  function addBreakDaySchedule() {

    // scheduleStore.setBreakDay(parsedDate[0], parsedDate[1], parsedDate[2])
  }
  function addSchedule() {
    navigate(`${choosenDate}/schedule/create`)
  }
  function gotoModify(id: number, date?: string) {
    if (!date) return
    navigate(`${date}/schedule/${id}`)
  }
  function startSchedule(id: number, date?: string) {
    if (!date) return
    navigate(`${date}/workout/${id}`)
  }
  const displaySchedule = useMemo(() => {
    const breakSchedule = scheduleList?.getScheduleByDate?.find(v => v.type === ScheduleType.BREAK)
    const displayList = []

    if (breakSchedule) {
      displayList.push(<div key="breakday-list"></div>)
      return displayList
    } else if (scheduleList?.getScheduleByDate) {
      displayList.push(scheduleList?.getScheduleByDate.map((schedule, idx) => {
        return <ScheduleDisplay key={schedule.id} schedule={schedule} id={schedule.id} date={choosenDate} title={`Part ${idx + 1}`} >
          {(id, type, date) => (
            <div className="grid grid-cols-2 gap-x-4">
              <Button onClick={() => gotoModify(id, date)}>Modify</Button>
              <Button onClick={() => startSchedule(id, date)}>
                {type === 'FINISH' ? 'Detail' : 'Start'}
              </Button>
            </div>
          )}
        </ScheduleDisplay>
      }))
    }
    displayList.push(<div key="btn-menu" className="grid grid-cols-2 gap-x-4">
      <Button className="bg-success-300" onClick={addSchedule}>
        Add Schedule
      </Button>
      <Button className="bg-danger-400" isDisabled={Boolean(scheduleList?.getScheduleByDate.length)} onClick={addBreakDaySchedule}>
        Set Break Day
      </Button>
    </div>)
    return displayList
  }, [scheduleList])

  return (
    <>
      {displaySchedule}
    </>
  );
}
