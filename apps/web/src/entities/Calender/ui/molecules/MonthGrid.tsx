import type { DateValue } from '../../types'
import type { MonthGridProps } from '../types'
import MonthButton from '../atoms/MonthButton'

export default function MonthGrid({
  targetMode = 'date',
  ...props
}: MonthGridProps) {
  const { value, onChange, onModeChange } = props
  const changeAction = (v: DateValue) => {
    onChange(v)
    if (onModeChange && targetMode) {
      onModeChange(targetMode)
    }
  }
  return <div className="grid grid-cols-4 gap-2">
    {Array(12).fill(0).map((_v, i) => {
      const idx = i + 1
      return <MonthButton
        {...props}
        onChange={changeAction}
        display={{ ...value, month: idx }}
      />
    })}
  </div>
}