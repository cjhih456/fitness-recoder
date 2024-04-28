import { Accordion, AccordionItem, Button } from '@nextui-org/react'
import { Schedule } from '../../service/Store/Schedule'
import { useNavigate } from 'react-router-dom'
import SimpleFitnessList from '../Fitness/SimpleFitnessList'

interface ScheduleDisplayProps {
  schedule: Schedule
  index: number
}

export default function ScheduleDisplay({ schedule, index }: ScheduleDisplayProps) {
  const navigate = useNavigate()
  function gotoModify() {
    navigate(`${schedule.year}-${schedule.month}-${schedule.date}/schedule/${schedule.id}`)
  }
  function startSchedule() {
    navigate(`${schedule.year}-${schedule.month}-${schedule.date}/workout/${schedule.id}`)
  }
  return <Accordion variant='bordered'>
    <AccordionItem title={`Part ${index}`}>
      <div className="flex flex-col gap-y-2">
        <SimpleFitnessList list={schedule.exerciseList} />
        <div className="grid grid-cols-2 gap-x-4">
          <Button onClick={gotoModify}>Modify</Button>
          <Button onClick={startSchedule}>Start</Button>
        </div>
      </div>
    </AccordionItem>
  </Accordion>
}
