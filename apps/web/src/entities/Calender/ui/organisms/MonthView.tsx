import type { MonthCalenderProps } from '../types';
import MonthGrid from '../molecules/MonthGrid';
import MonthViewHead from '../molecules/MonthViewHead';

export default function MonthView(props: MonthCalenderProps) {
  return <>
    <MonthViewHead {...props} />
    <MonthGrid {...props} />
  </>
}
