import type { YearCalenderProps } from '../types';
import YeerGrid from '../molecules/YearGrid';

export default function YearView(props: YearCalenderProps) {
  return <>
    <YeerGrid {...props} />
  </>
}