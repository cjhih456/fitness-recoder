import { Accordion, AccordionItem } from '@nextui-org/react'
import SimpleFitnessList from '../Fitness/SimpleFitnessList'
import { useLazyGetExerciseListByScheduleId } from '../../service/GqlStore/Exercise'
import { ReactNode, useEffect, useMemo } from 'react'
import { Exercise, Schedule } from 'fitness-struct'

export interface ScheduleDisplayProps {
  id: number,
  title: string,
  schedule?: Schedule.Schedule
  exerciseList?: Exercise.Data[]
  date?: string
  children?: (_id: number, _type?: keyof typeof Schedule.IType, _date?: string) => ReactNode
}

export default function ScheduleDisplay({ title, date, id, schedule, exerciseList, children }: ScheduleDisplayProps) {
  const [getExerciseList, { data }] = useLazyGetExerciseListByScheduleId()
  useEffect(() => {
    if (schedule)
      getExerciseList({
        variables: {
          scheduleId: schedule?.id || 0
        }
      })
  }, [schedule, getExerciseList])
  const lazyExerciseList = useMemo(() => {
    return exerciseList ? exerciseList : data?.getExerciseListByScheduleId || []
  }, [exerciseList, data])
  return <Accordion variant='bordered'>
    <AccordionItem title={title}>
      <div className="flex flex-col gap-y-2">
        <SimpleFitnessList exerciseDataList={lazyExerciseList} />
        {children && children(id, schedule?.type, date)}
      </div>
    </AccordionItem>
  </Accordion>
}
