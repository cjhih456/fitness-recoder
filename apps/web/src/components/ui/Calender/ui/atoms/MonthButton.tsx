import type { MonthButtonProps } from '../types';
import { Button } from '@heroui/react';
import DateService from '../../model/DateService';

export default function MonthButton({
  value,
  display,
  dateRange,
  onChange
}: MonthButtonProps) {
  const inRange = DateService.isDateInRange(display, dateRange)
  const isChecked = DateService.isEqual(display, value, 'month')
  return <Button
    isDisabled={!inRange}
    color={isChecked ? 'primary' : undefined}
    onPress={() => onChange(display)}
  >
    {display.month}
  </Button>
}