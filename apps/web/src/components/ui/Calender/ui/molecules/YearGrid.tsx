import type { DateValue } from '../../types'
import type { YearCalenderProps } from '../types'
import YearButton from '../atoms/YearButton'

export default function YeerGrid(props: YearCalenderProps) {
  const { dateRange, onChange, onModeChange, targetMode } = props
  const { startDate, endDate } = dateRange
  const startYear = startDate.year
  const endYear = endDate.year
  const changeAction = (v: DateValue) => {
    onChange(v)
    if (onModeChange && targetMode) {
      onModeChange(targetMode)
    }
  }
  return <div className="overflow-hidden grid grid-cols-4 gap-2">
    {Array(endYear - startYear + 1).fill(0).map((_v, i) => {
      return <YearButton display={{ ...startDate, year: i + startYear }} {...props} onChange={changeAction} />
    })}
  </div>
}