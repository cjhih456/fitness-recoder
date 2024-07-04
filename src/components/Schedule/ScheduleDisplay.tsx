import { Accordion, AccordionItem } from '@nextui-org/react'
import SimpleFitnessList from '../Fitness/SimpleFitnessList'

export interface ScheduleDisplayProps {
  id: string,
  title: string,
  schedule?: Schedule
  exerciseList?: string[]
  date?: string
  children?: (id: string, type?: keyof typeof IScheduleType, date?: string) => React.ReactNode
}

export default function ScheduleDisplay({ title, date, id, schedule, exerciseList, children }: ScheduleDisplayProps) {
  return <Accordion variant='bordered'>
    <AccordionItem title={title}>
      <div className="flex flex-col gap-y-2">
        <SimpleFitnessList exerciseDataIdxList={schedule?.exerciseList || exerciseList || []} />
        {children && children(id, schedule?.type, date)}
      </div>
    </AccordionItem>
  </Accordion>
}
