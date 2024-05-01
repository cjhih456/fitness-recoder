import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import SimpleFitnessList from '../Fitness/SimpleFitnessList'

interface ScheduleDisplayProps {
  schedule: Schedule
  index: number
  date: string
  id: string
}

export default function ScheduleDisplay({ date, id, schedule, index }: ScheduleDisplayProps) {
  const navigate = useNavigate()
  function gotoModify() {
    navigate(`${date}/schedule/${id}`)
  }
  function startSchedule() {
    navigate(`${date}/workout/${id}`)
  }
  return <Accordion variant='bordered'>
    <AccordionItem title={`Part ${index}`}>
      <div className="flex flex-col gap-y-2">
        <SimpleFitnessList exerciseDataIdxList={schedule.exerciseList} />
        <div className="grid grid-cols-2 gap-x-4">
          <Button onClick={gotoModify}>Modify</Button>
          <Button onClick={startSchedule}>Start</Button>
        </div>
      </div>
    </AccordionItem>
  </Accordion>
}
