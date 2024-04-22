import ScheduleDisplay from './ScheduleDisplay';
import { Schedule, ScheduleType } from '../../service/Store/Schedule';
import { useMemo } from 'react';

interface ScheduleListProps {
    scheduleList: Schedule[]
}

export default function ScheduleList({ scheduleList }: ScheduleListProps){
  const displaySchedule = useMemo(() => {
    const schedule = scheduleList[0]
    if (schedule && schedule.type === ScheduleType.BREAK) {
      return <div></div>
    } else if(scheduleList.length) {
      return scheduleList.map((schedule) => {
        return <ScheduleDisplay key={schedule.id} schedule={schedule} ></ScheduleDisplay>
      })
    }
    return undefined
  },[scheduleList])
  return (
    <div>
      {displaySchedule}
    </div>
  );
}
