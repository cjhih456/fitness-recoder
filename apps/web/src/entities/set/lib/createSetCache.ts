import type { SetsStoreType } from '../model';
import type { ApolloCache, Reference } from '@apollo/client';
import type { AsStoreObject } from '@apollo/client/utilities';
import SetsFragment from '../api/fragment/SetsFragment';

export default function createSetCache(
  id: number | Reference | AsStoreObject<SetsStoreType>,
  cache: ApolloCache<any>,
  data: SetsStoreType
) {
  const currentId = typeof id === 'number' ? cache.identify({ id, __typename: 'Sets' }) : cache.identify(id)
  return cache.writeFragment({ id: currentId, fragment: SetsFragment, data })
}
