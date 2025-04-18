import type { SetsStoreType } from '../model'
import { useSuspenseFragment } from '@apollo/client'
import SetsFragment from '../api/fragment/SetsFragment'
export default function useSetFragment(setId: number) {
  const { data } = useSuspenseFragment<SetsStoreType>({
    from: {
      id: setId,
      __typename: 'Sets'
    },
    fragment: SetsFragment
  })
  return data
}