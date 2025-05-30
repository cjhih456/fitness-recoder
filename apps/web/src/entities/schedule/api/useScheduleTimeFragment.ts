import type { ScheduleStoreType } from '@entities/schedule/model';
import { useSuspenseFragment } from '@apollo/client';
import ScheduleTimeFragment from './fragment/ScheduleTimeFragment';

export default function useScheduleTimeFragment(scheduleId: number) {
  const { data } = useSuspenseFragment<ScheduleStoreType>({
    fragment: ScheduleTimeFragment,
    from: {
      id: scheduleId,
      __typename: 'ScheduleData'
    }
  })
  return data
}
