import type { Exercise } from 'fitness-struct'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { useMemo } from 'react'

interface DisplayFitnessFinishHistoryProps {
  history: Exercise.HistoryData
}

export default function DisplayFitnessFinishHistory({ history }: DisplayFitnessFinishHistoryProps) {
  const date = useMemo(() => {
    return `${history.year}. ${history.month}. ${history.date}`
  }, [history])
  const repeats = history.repeats.split(',')
  const weights = history.weights.split(',')

  return <Card className="w-36">
    <CardHeader className="justify-center">
      {date}
    </CardHeader>
    <CardBody>
      {Array(history.cnt).fill(0).map((_v, idx) => {
        return <div className="flex justify-between" key={`${history.id}-${idx}`}>
          <span>{`${weights[idx]}${history.weightUnit}`}</span>
          <span>{`${repeats[idx]}`}rep</span>
        </div>
      })}
    </CardBody>
  </Card>
}