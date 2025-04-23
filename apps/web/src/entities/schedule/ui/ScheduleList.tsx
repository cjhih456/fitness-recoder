import type { ScheduleStoreType } from '../model';
import type { ReactElement } from 'react';
import { cloneElement } from 'react';
import MenuableAccordion from '@shared/ui/MenuableAccordion';

export interface ScheduleListProps {
  scheduleList: ScheduleStoreType[]
  children: (_schedule: ScheduleStoreType, _idx: number) => ReactElement
}

export default function ScheduleList({
  scheduleList,
  children

}: ScheduleListProps) {
  return <MenuableAccordion.GroupProvider key="schedule-list">
    {scheduleList.map((schedule, idx) => {
      return cloneElement(children(schedule, idx), { key: `schedule-${schedule.id}` })
    })}
  </MenuableAccordion.GroupProvider>;
}
