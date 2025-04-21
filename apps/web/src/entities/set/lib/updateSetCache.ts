import type { SetsStoreType } from '../model'
import type { ApolloCache, Reference } from '@apollo/client'
import type { AsStoreObject } from '@apollo/client/utilities'
import SetsFragment from '../api/fragment/SetsFragment'

export default function updateSetCache(
  id: number | Reference | AsStoreObject<SetsStoreType>,
  cache: ApolloCache<any>,
  updateFn: (_set: SetsStoreType) => SetsStoreType
) {
  const currentId = typeof id === 'number' ? cache.identify({ id, __typename: 'Sets' }) : cache.identify(id)
  return cache.updateFragment<SetsStoreType>({ id: currentId, fragment: SetsFragment }, (set) => {
    if (!set) return set
    return updateFn(set)
  })
}
