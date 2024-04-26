import ScheduleDisplay from './ScheduleDisplay';
import { Schedule, ScheduleType } from '../../service/Store/Schedule';
import { useMemo } from 'react';
import { useScheduleStore } from '../../service/Store/ScheduleStore';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

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
      const scheduleList = scheduleStore.getScheduleData(year, month, date)
      return [[year, month, date], scheduleList]
    }
    return [[], []]
  }, [choosenDate])

  function addBreakDaySchedule() {
    const schedule = new Schedule(parsedDate[0], parsedDate[1], parsedDate[2])
    schedule.setBreakDay()
    scheduleStore.setScheduleData(schedule)
  }
  function addSchedule() {
    navigate(`${choosenDate}/schedule/create`)
  }

  const displaySchedule = useMemo(() => {
    const schedule = scheduleList[0]
    const displayList = []

    if (schedule && schedule.type === ScheduleType.BREAK) {
      displayList.push(<div key="breakday-list"></div>)
      return displayList
    } else if (scheduleList.length) {
      displayList.push(scheduleList.map((schedule, idx) => {
        return <ScheduleDisplay key={schedule.id} schedule={schedule} index={idx} ></ScheduleDisplay>
      }))
    }
    displayList.push(<div key="btn-menu" className="grid grid-cols-2 gap-x-4">
      <Button className="bg-success-300" onClick={addSchedule}>
        Add Schedule
      </Button>
      <Button className="bg-danger-400" onClick={addBreakDaySchedule}>
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
