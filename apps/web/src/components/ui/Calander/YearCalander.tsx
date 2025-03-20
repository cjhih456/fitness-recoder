import { Button } from '@heroui/react'
import { useMemo } from 'react'

interface YearCalanderProps {
  year: number
  startYear?: number,
  endYear?: number,
  onChange?: (_newYear: number) => void
}
export default function YearCalander({ year, startYear, endYear, onChange }: YearCalanderProps) {
  const displayStartYear = useMemo(() => startYear || 1900, [startYear])
  const displayEndYear = useMemo(() => endYear || 2100, [endYear])

  return <div className="overflow-hidden grid grid-cols-4 gap-2">
    {Array(displayEndYear - displayStartYear + 1).fill(0).map((_v, i) => {
      const displayYear = i + displayStartYear
      return <Button
        key={`year-${displayYear}`}
        color={displayYear == year ? 'primary' : undefined}
        onClick={() => onChange && onChange(displayYear)}
      >{displayYear}</Button>
    })}
  </div>
}