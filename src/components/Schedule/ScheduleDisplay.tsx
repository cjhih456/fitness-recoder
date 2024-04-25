import { Accordion, AccordionItem } from '@nextui-org/react'
import { Schedule } from '../../service/Store/Schedule'

interface ScheduleDisplayProps {
  schedule: Schedule
  index: number
}

export default function ScheduleDisplay({ schedule, index } : ScheduleDisplayProps) {
  return <Accordion variant='bordered'>
    <AccordionItem title={`Part ${index}`}>

    </AccordionItem>
  </Accordion>
  // <Card>
  //   <CardHeader>
  //     <div>
  //       <span>Part {index}</span>
  //     </div>
  //   </CardHeader>
  //   <CardBody>
      
  //   </CardBody>
  // </Card>
}
