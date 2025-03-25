import type { BaseCalanderProps } from './Calander'
import { Button } from '@heroui/react'
import useCalanderHook from './hooks/useCalanderHook'

type MonthCalanderProps = BaseCalanderProps

export default function MonthCalander({
  value,
  onChange,
  ...props
}: MonthCalanderProps) {
  const { validMonthWithValues } = useCalanderHook(props)
  const [year, month, date] = value.split('-').map(v => +v)

  return <div className="grid grid-cols-4 gap-2">
    {Array(12).fill(0).map((_v, i) => {
      const idx = i + 1
      return <Button
        key={`month-${idx}`}
        isDisabled={validMonthWithValues(year, idx)}
        color={month === idx ? 'primary' : undefined}
        onPress={() => onChange([year, idx, date].join('-'))}
      >{idx}</Button>
    })}
  </div>
}