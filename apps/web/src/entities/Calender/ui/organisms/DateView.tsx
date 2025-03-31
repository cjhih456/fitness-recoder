import type { DateCalenderProps } from '../types';
import DateTitleRow from '../atoms/DateTitleRow';
import DateGrid from '../molecules/DateGrid';
import DateViewHead from '../molecules/DateViewHead';

export default function DateView(props: DateCalenderProps) {
  return <>
    <DateViewHead {...props} />
    <DateGrid
      {...props}
      titleRow={<DateTitleRow />}
    />
  </>
}