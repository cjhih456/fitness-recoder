import type { DateValue, DateRange } from '../types';
import type { ReactNode } from 'react';

export type CalendarMode = 'date' | 'month' | 'year';

export interface CalenderBaseProps {
  dateRange: DateRange
  value: DateValue
  onChange: (_value: DateValue) => void
}

export interface DateCalenderStates {
  colorByDate?: string[]
}

export interface DateButtonProps extends CalenderBaseProps {
  display: DateValue
  color?: string
  isSelected?: boolean
}

export interface DateGridProps extends CalenderBaseProps, DateCalenderStates {
  titleRow?: ReactNode
}

export interface DateViewHeadProps extends DateCalenderProps {
}

export interface DateCalenderProps extends CalenderBaseProps, DateCalenderStates {
  onModeChange?: (_mode: CalendarMode) => void;
  prevMode?: CalendarMode
}

export interface MonthCalenderProps extends CalenderBaseProps {
  onModeChange?: (_mode: CalendarMode) => void;
  targetMode?: CalendarMode;
  prevMode?: CalendarMode
}

export interface MonthButtonProps extends CalenderBaseProps {
  display: DateValue
}

export interface MonthGridProps extends CalenderBaseProps {
  onModeChange?: (_mode: CalendarMode) => void;
  targetMode?: CalendarMode;
}

export interface MonthViewHeadProps extends CalenderBaseProps {
  onModeChange?: (_mode: CalendarMode) => void;
  prevMode?: CalendarMode;
}

export interface YearButtonProps {
  display: DateValue
  value: DateValue
  onChange: (_value: DateValue) => void
}

export interface YearCalenderProps extends CalenderBaseProps {
  onModeChange?: (_mode: CalendarMode) => void;
  targetMode?: CalendarMode;
}

export interface YearGridProps extends YearCalenderProps {
}

export interface CalenderProps extends CalenderBaseProps, DateCalenderStates {
  defaultMode?: CalendarMode
}