import { Button } from '@nextui-org/react'
import { useMemo } from 'react'

interface MonthCalanderProps {
  startMonth?: number
  endMonth?: number
  month: number
  onChange: (v: number) => void
}

export default function MonthCalander({
  startMonth,
  endMonth,
  month,
  onChange,
}: MonthCalanderProps) {
  const displayStartMonth = useMemo(() => startMonth || 0, [startMonth])
  const displayEndMonth = useMemo(() => endMonth || 13, [endMonth])
  const monthList = useMemo(() => {
    const temp = []
    for (let i = 0; i < 12; i += 4) {
      const row = []
      for (let j = i; j < i + 4; j++) {
        let disabled = false
        const displayMonth = j + 1
        if (
          (displayMonth < displayStartMonth) || (displayMonth > displayEndMonth)
        ) {
          disabled = true
        }
        row.push(<Button
          key={`month-${displayMonth}`}
          isDisabled={disabled}
          color={month === displayMonth ? 'primary' : undefined}
          onClick={() => onChange(displayMonth)}
        >{displayMonth}</Button>)
      }
      temp.push(<div key={`month-row-${i}`} className="flex flex-nowrap gap-x-2">{row}</div>)
    }
    return temp
  }, [displayStartMonth, displayEndMonth, month, onChange])
  return <div className="flex gap-y-2 flex-col">
    {monthList}
  </div>
}