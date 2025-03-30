import type { YearButtonProps } from '../types';
import { Button } from '@heroui/react';
import DateService from '../../model/DateService';

export default function YearButton({
  display,
  onChange,
  value
}: YearButtonProps) {
  return <Button
    color={DateService.isEqual(value, display, 'year') ? 'primary' : undefined}
    onPress={() => onChange(display)}
  >{display.year}</Button>
}