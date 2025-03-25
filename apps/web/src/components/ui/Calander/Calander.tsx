import StateRender from '@utils/StateRender';
import DateCalander from './DateCalander';
import DateCalanderHead from './DateCalanderHead';
import MonthCalander from './MonthCalander';
import MonthCalanderHead from './MonthCalanderHead';
import YearCalander from './YearCalander';
import useCalanderHook from './hooks/useCalanderHook';

export type Mode = 'date' | 'month' | 'year'

export interface BaseCalanderProps {
  value: string
  startDate: string,
  endDate: string
  onChange: (_v: string) => void
}
export interface CalanderProps extends BaseCalanderProps {
  mode: Mode
  onChangeMode: (_v: Mode) => void
  statesByDate?: string[],
}
export default function Calender({
  mode,
  onChange,
  ...props
}: CalanderProps) {
  const { startDate, endDate, onChangeMode } = props

  const { calcPossibleDate } = useCalanderHook({ startDate, endDate })
  const changeTrigger = (v: string) => onChange(calcPossibleDate(v))

  const changeYear = (v: string, mode: boolean = true) => {
    changeTrigger(v)
    if (mode) onChangeMode('month')
  }

  const changeMonth = (v: string) => {
    changeTrigger(v)
    onChangeMode('date')
  }

  return (
    <div className="h-min border-medium border-divider p-4 rounded-medium flex flex-col gap-4 transition-size">
      <StateRender
        state={mode}
        render={{
          year: undefined,
          month: <MonthCalanderHead
            {...props}
            onChange={changeMonth}
          />,
          date: <DateCalanderHead
            {...props}
            onChange={changeTrigger}
          />
        }}
      />
      <StateRender
        state={mode}
        render={{
          year: <YearCalander
            {...props}
            onChange={changeYear}
          />,
          month: <MonthCalander
            {...props}
            onChange={changeMonth}
          />,
          date: <DateCalander
            {...props}
            onChange={changeTrigger}
          />
        }}
      />
    </div>
  );
}
