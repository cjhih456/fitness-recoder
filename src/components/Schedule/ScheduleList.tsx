import ScheduleDisplay from './ScheduleDisplay';
import { Schedule, ScheduleType } from '../../service/Store/Schedule';
import { useMemo } from 'react';
import { useScheduleStore } from '../../service/Store/ScheduleStore';
import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

interface ScheduleListProps {
  choosenDate: string
}

export default function ScheduleList({ choosenDate }: ScheduleListProps) {
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
    displayList.push(<div key="btn-menu" className="flex gap-x-3 justify-center">
      <Link to={`${choosenDate}/fitnessList`}>
        <Button className="bg-success-300">
          Add Schedule
        </Button>
      </Link>
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
