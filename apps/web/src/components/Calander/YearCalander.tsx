import { Button } from '@nextui-org/react'
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
  const displayList = useMemo(() => {
    const changeYear = (v: number) => onChange && onChange(Math.min(Math.max(displayStartYear, v), displayEndYear))

    const times = displayEndYear - displayStartYear
    const temp = []
    for (let i = 0; i < times; i += 4) {
      const row = []
      for (let j = i; j < i + 4 && j <= times; j++) {
        const displayYear = j + displayStartYear
        row.push(<Button
          key={`year-${displayYear}`}
          color={displayYear == year ? 'primary' : undefined}
          onClick={() => changeYear(displayYear)}
        >{displayYear}</Button>)
      }
      temp.push(<div key={`year-row-${i}`} className="flex flex-nowrap gap-x-2">{row}</div>)
    }
    return temp
  }, [year, displayStartYear, displayEndYear, onChange])

  return <div className="overflow-hidden flex flex-col gap-y-2">
    {displayList}
  </div>
}