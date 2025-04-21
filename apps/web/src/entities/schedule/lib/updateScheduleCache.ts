import type { ScheduleStoreType } from '../model'
import type { ApolloCache, Reference } from '@apollo/client'
import type { AsStoreObject } from '@apollo/client/utilities'
import ScheduleTimeFragment from '../api/fragment/ScheduleTimeFragment'
export default function updateScheduleCache(
  id: number | Reference | AsStoreObject<ScheduleStoreType>,
  cache: ApolloCache<any>,
  updateFn: (_schedule: ScheduleStoreType) => ScheduleStoreType
) {
  const currentId = typeof id === 'number' ? cache.identify({
    id,
    __typename: 'ScheduleData'
  }) : cache.identify(id)
  return cache.updateFragment<ScheduleStoreType>({
    id: currentId,
    fragment: ScheduleTimeFragment
  }, (schedule) => {
    if (!schedule) return schedule
    return updateFn(schedule)
  })
}
