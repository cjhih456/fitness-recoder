import type { DateButtonProps } from '../types';
import { Button } from '@heroui/react';
import { DateService } from '@widgets/calender';

export default function DateButton({
  display,
  dateRange,
  onChange,
  isSelected,
  color
}: DateButtonProps) {
  const inRange = DateService.isDateInRange(display, dateRange)
  return <Button
    isDisabled={!inRange}
    variant='bordered'
    onPress={() => onChange(display)}
    className={['flex-1 px-0 min-w-[40px]', isSelected ? 'bg-primary' : color].join(' ')}
    radius='full'
  >
    {display.date}
  </Button>
}