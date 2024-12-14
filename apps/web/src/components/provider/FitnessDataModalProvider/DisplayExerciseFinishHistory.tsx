import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Exercise } from 'fitness-struct'
import { useMemo } from 'react'

interface DisplayFitnessFinishHistoryProps {
  history: Exercise.HistoryData
}

export default function DisplayFitnessFinishHistory({ history }: DisplayFitnessFinishHistoryProps) {
  const date = useMemo(() => {
    return `${history.year}. ${history.month}. ${history.date}`
  }, [history])
  const rows = useMemo(() => {
    const repeats = history.repeats.split(',')
    const weights = history.weights.split(',')
    const temp = Array(history.cnt).fill(0).map((_v, idx) => {
      return {
        idx: `${history.id}-${idx}`,
        weight: weights[idx],
        repeat: repeats[idx]
      }
    })
    return temp.map(v => (<div className="flex justify-between" key={v.idx}>
      <span>{`${v.weight}${history.weightUnit}`}</span>
      <span>{`${v.repeat}`}rep</span>
    </div>))
  }, [history])
  return <Card className="w-36">
    <CardHeader className="justify-center">
      {date}
    </CardHeader>
    <CardBody>
      {rows}
    </CardBody>
  </Card>
}