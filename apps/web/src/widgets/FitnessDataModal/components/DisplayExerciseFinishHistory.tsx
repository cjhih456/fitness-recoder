import type { Exercise } from '@fitness/struct'
import { Card, CardBody, CardHeader } from '@heroui/react'
import { useMemo } from 'react'

interface DisplayFitnessFinishHistoryProps {
  history: Exercise.HistoryData
}

export default function DisplayFitnessFinishHistory({ history }: DisplayFitnessFinishHistoryProps) {
  const date = useMemo(() => {
    return `${history.year}. ${history.month}. ${history.date}`
  }, [history])

  return <Card className="w-36">
    <CardHeader className="justify-center">
      {date}
    </CardHeader>
    <CardBody>
      {history.historyList.map((v, idx) => {
        return <div className="flex justify-between" key={`${history.id}-${idx}`}>
          <span>{`${v.weight}${history.weightUnit}`}</span>
          <span>{`${v.repeat}`}rep</span>
        </div>
      })}
    </CardBody>
  </Card>
}