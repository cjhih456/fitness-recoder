import type { DateButtonProps } from '../types';
import { Button } from '@heroui/react';
import DateService from '@ui/Calender/model/DateService';
import { calanderColor } from '@utils';

export default function DateButton({
  value,
  display,
  dateRange,
  onChange,
  statesByDate = []
}: DateButtonProps) {
  const colorClass = calanderColor(DateService.isEqual(display, value), statesByDate[display.date])
  const inRange = DateService.isDateInRange(display, dateRange)
  return <Button
    isDisabled={!inRange}
    variant='bordered'
    onPress={() => onChange(display)}
    className={['flex-1 px-0 min-w-[40px]', colorClass].join(' ')}
    radius='full'
  >
    {display.date}
  </Button>
}