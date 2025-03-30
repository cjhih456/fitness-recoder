import type { DateGridProps } from '../types';
import StateRender from '@utils/StateRender';
import DateService from '../../model/DateService';
import DateButton from '../atoms/DateButton';

export default function DateGrid({
  titleRow,
  ...props
}: DateGridProps) {
  const { value } = props
  const { year, month } = value
  const daysInMonth = DateService.getDaysInMonth(year, month)
  const startTemp = DateService.getFirstDayOfMonth(year, month)

  return <div className="grid grid-rows-7 grid-cols-7 gap-1 justify-items-stretch min-w-[320px]">
    {titleRow}
    <StateRender.Boolean
      state={Boolean(startTemp)}
      render={{
        true: <div className={`col-span-${startTemp}`}></div>
      }}
    />
    {Array(daysInMonth).fill(0).map(
      (_v, i) => {
        const buttonDate = { year, month, date: i + 1 }
        return <DateButton
          key={`date-btn-${i}`}
          {...props}
          display={buttonDate}
        />
      }
    )}
  </div>
}