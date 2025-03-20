import { Button } from '@heroui/react'
import useCalanderHook from './hooks/useCalanderHook'

interface MonthCalanderProps {
  year: number
  month: number
  startDate?: string
  endDate?: string
  onChange: (_v: number) => void
}

export default function MonthCalander({
  year,
  month,
  startDate = '1900-1-1',
  endDate = '2100-12-31',
  onChange
}: MonthCalanderProps) {
  const { validMonthWithValues } = useCalanderHook({ startDate, endDate })

  return <div className="grid grid-cols-4 gap-2">
    {Array(12).fill(0).map((_v, i) => {
      const idx = i + 1
      return <Button
        key={`month-${idx}`}
        isDisabled={validMonthWithValues(year, idx)}
        color={month === idx ? 'primary' : undefined}
        onClick={() => onChange(idx)}
      >{idx}</Button>
    })}
  </div>
}