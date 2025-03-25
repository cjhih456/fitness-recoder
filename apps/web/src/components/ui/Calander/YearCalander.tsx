import type { BaseCalanderProps } from './Calander'
import { Button } from '@heroui/react'

type YearCalanderProps = BaseCalanderProps
export default function YearCalander({
  value,
  startDate = '1900-1-1',
  endDate = '2100-12-31',
  onChange
}: YearCalanderProps) {
  const [year, month, date] = value.split('-').map(v => +v)
  const [startYear] = startDate.split('-').map(v => +v)
  const [endYear] = endDate.split('-').map(v => +v)

  return <div className="overflow-hidden grid grid-cols-4 gap-2">
    {Array(endYear - startYear + 1).fill(0).map((_v, i) => {
      const displayYear = i + startYear
      return <Button
        key={`year-${displayYear}`}
        color={displayYear == year ? 'primary' : undefined}
        onPress={() => onChange && onChange([displayYear, month, date].join('-'))}
      >{displayYear}</Button>
    })}
  </div>
}