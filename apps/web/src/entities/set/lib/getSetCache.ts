import type { SetsStoreType } from '../model'
import type { ApolloCache, Reference } from '@apollo/client'
import type { AsStoreObject } from '@apollo/client/utilities'
import SetsFragment from '../api/fragment/SetsFragment'
export default function getSetCache(id: number | Reference | AsStoreObject<SetsStoreType>, cache: ApolloCache<any>) {
  const currentId = typeof id === 'number' ? cache.identify({ id, __typename: 'Sets' }) : cache.identify(id)
  return cache.readFragment<SetsStoreType>({ id: currentId, fragment: SetsFragment })
}
