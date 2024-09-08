import { Accordion, AccordionItem } from '@nextui-org/react'
import SimpleFitnessList from '../Fitness/SimpleFitnessList'
import { useGetExerciseListByScheduleId } from '../../service/GqlStore/Exercise'
import { useMemo } from 'react'

export interface ScheduleDisplayProps {
  id: number,
  title: string,
  schedule?: Schedule
  exerciseList?: ExerciseData[]
  date?: string
  children?: (id: number, type?: keyof typeof IScheduleType, date?: string) => React.ReactNode
}

export default function ScheduleDisplay({ title, date, id, schedule, exerciseList, children }: ScheduleDisplayProps) {
  const { data } = useGetExerciseListByScheduleId(schedule?.id || 0)
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
