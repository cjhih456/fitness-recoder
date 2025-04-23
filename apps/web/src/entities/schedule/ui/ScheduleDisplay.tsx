import type { Schedule } from '@fitness/struct'
import type { MenuType } from '@shared/model/menuType';
import type { ReactNode } from 'react';
import MenuableAccordion from '@shared/ui/MenuableAccordion';

export interface ScheduleDisplayProps {
  title: string,
  schedule: Schedule.Data
  children?: (_id: number, _type: Schedule.IType, _date: string) => ReactNode
  menu: MenuType[]
  exerciseListCount: number,
}

export default function ScheduleDisplay({
  title,
  schedule,
  children,
  menu,
  exerciseListCount
}: ScheduleDisplayProps) {
  const date = `${schedule.year}-${schedule.month}-${schedule.date}`

  return <MenuableAccordion.GroupContent menu={menu} openId={schedule.id}>
    {{
      title: <>
        <h3 className="font-medium text-xl mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">
          {exerciseListCount} exercises
        </p>
      </>,
      content: <div className="flex flex-col gap-y-2">
        {children && children(schedule.id, schedule?.type, date)}
      </div>
    }}
  </MenuableAccordion.GroupContent>
}
