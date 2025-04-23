import type { CalenderProps, CalendarMode } from '../types'
import type { DateValue } from '@shared/lib/dateService'
import { memo, useState } from 'react'
import { DateService } from '@shared/lib/dateService'
import { EnumRender } from '@shared/ui/StateRender'
import DateView from '../organisms/DateView'
import MonthView from '../organisms/MonthView'
import YearView from '../organisms/YearView'

const Calender = memo((props: CalenderProps) => {
  const { onChange, dateRange, defaultMode } = props
  const [mode, setMode] = useState<CalendarMode>(defaultMode ?? 'date')
  const changeTrigger = (v: DateValue) => onChange(DateService.adjustDateToRange(v, dateRange))

  return (
    <div className="h-min border-medium border-divider p-4 rounded-medium flex flex-col gap-4 transition-size">
      <EnumRender
        state={mode}
        render={{
          year: () => <YearView
            {...props}
            onChange={changeTrigger}
            targetMode='month'
          />,
          month: () => <MonthView
            {...props}
            prevMode='year'
            targetMode='date'
            onModeChange={setMode}
            onChange={changeTrigger}
          />,
          date: () => <DateView
            {...props}
            prevMode='month'
            onModeChange={setMode}
            onChange={changeTrigger}
          />
        }}
      />
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.dateRange === nextProps.dateRange &&
    prevProps.defaultMode === nextProps.defaultMode &&
    prevProps.value === nextProps.value
})
export default Calender