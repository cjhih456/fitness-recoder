import type { Schedule } from 'fitness-struct'
import type { ReactNode } from 'react';
import { useGetExerciseListByScheduleId } from '@hooks/apollo/Exercise'
import useScheduleMenu from '@hooks/useScheduleMenu'
import MenuableAccordion from '@ui/CustomComponent/MenuableAccordion'
import SimpleFitnessList from '@ui/Fitness/SimpleFitnessList'

export interface ScheduleDisplayProps {
  title: string,
  schedule: Schedule.Schedule
  date: string
  children?: (_id: number, _type: Schedule.IType, _date: string) => ReactNode
}

export default function ScheduleDisplay({ title, date, schedule, children }: ScheduleDisplayProps) {
  const { data } = useGetExerciseListByScheduleId(schedule.id)
  const lazyExerciseList = data.getExerciseListByScheduleId

  const scheduleMenu = useScheduleMenu(schedule)
  return <MenuableAccordion menu={scheduleMenu}>
    {() => {
      return {
        title: <>
          <h3 className="font-medium text-xl mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">
            {lazyExerciseList.length} exercises
          </p>
        </>,
        content: <div className="flex flex-col gap-y-2">
          <SimpleFitnessList exerciseDataList={lazyExerciseList} />
          {children && children(schedule.id, schedule?.type, date)}
        </div>
      }
    }}
  </MenuableAccordion>
}
