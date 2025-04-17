import type { DateGridProps } from '../types';
import { DateService } from '@shared/lib/dateService';
import { BooleanRender } from '@shared/ui/StateRender';
import DateButton from '../atoms/DateButton';

export default function DateGrid({
  titleRow,
  ...props
}: DateGridProps) {
  const { value, colorByDate } = props
  const { year, month } = value
  const daysInMonth = DateService.getDaysInMonth(year, month)
  const startTemp = DateService.getFirstDayOfMonth(year, month)

  return <div className="grid grid-rows-7 grid-cols-7 gap-1 justify-items-stretch min-w-[320px]">
    {titleRow}
    <BooleanRender
      state={Boolean(startTemp)}
      render={{
        true: () => <div className={`col-span-${startTemp}`}></div>
      }}
    />
    {Array(daysInMonth).fill(0).map(
      (_v, i) => {
        const buttonDate = { year, month, date: i + 1 }
        return <DateButton
          key={`date-btn-${i}`}
          {...props}
          isSelected={DateService.isEqual(value, buttonDate)}
          color={colorByDate ? colorByDate[buttonDate.date] : undefined}
          display={buttonDate}
        />
      }
    )}
  </div>
}