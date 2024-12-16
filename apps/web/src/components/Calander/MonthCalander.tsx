import { Button } from '@nextui-org/react'
import { useMemo } from 'react'
import useCalanderHook from '@hooks/useCalanderHook'

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
  const monthList = useMemo(() => {
    const temp = []
    for (let i = 0; i < 12; i += 4) {
      const row = []
      for (let j = i; j < i + 4; j++) {
        const displayMonth = j + 1
        let disabled = validMonthWithValues(year, displayMonth)
        row.push(<Button
          key={`month-${displayMonth}`}
          isDisabled={disabled}
          color={month === displayMonth ? 'primary' : undefined}
          onClick={() => onChange(displayMonth)}
        >{displayMonth}</Button>)
      }
      temp.push(<div key={`month-row-${i}`} className="grid grid-cols-4 gap-x-2">{row}</div>)
    }
    return temp
  }, [validMonthWithValues, month, onChange, year])
  return <div className="flex gap-y-2 flex-col">
    {monthList}
  </div>
}