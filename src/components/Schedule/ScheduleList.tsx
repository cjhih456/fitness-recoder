import ScheduleDisplay from './ScheduleDisplay';
import { useMemo } from 'react';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import useScheduleStore, { ScheduleType } from '../../service/Store/ScheduleStoreHooks';

interface ScheduleListProps {
  choosenDate: string
}

export default function ScheduleList({ choosenDate }: ScheduleListProps) {
  const navigate = useNavigate()
  // Schedule Store
  const scheduleStore = useScheduleStore()
  const [parsedDate, scheduleList] = useMemo(() => {
    if (choosenDate) {
      const [year, month, date] = choosenDate.split('-').map(v => +v)
      const scheduleList = scheduleStore.getScheduleByData(year, month, date)
      return [[year, month, date], scheduleList]
    }
    return [[], []]
  }, [choosenDate])

  function addBreakDaySchedule() {
    scheduleStore.setBreakDay(parsedDate[0], parsedDate[1], parsedDate[2])
  }
  function addSchedule() {
    navigate(`${choosenDate}/schedule/create`)
  }

  const displaySchedule = useMemo(() => {
    const breakSchedule = scheduleList.find(v => v.type === ScheduleType.BREAK)
    const displayList = []


    if (breakSchedule) {
      displayList.push(<div key="breakday-list"></div>)
      return displayList
    } else if (scheduleList) {
      displayList.push(scheduleList.map((schedule, idx) => {
        return <ScheduleDisplay key={schedule.id} schedule={schedule} id={schedule.id} date={choosenDate} index={idx + 1} ></ScheduleDisplay>
      }))
    }
    displayList.push(<div key="btn-menu" className="grid grid-cols-2 gap-x-4">
      <Button className="bg-success-300" onClick={addSchedule}>
        Add Schedule
      </Button>
      <Button className="bg-danger-400" isDisabled={Boolean(scheduleList.length)} onClick={addBreakDaySchedule}>
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
