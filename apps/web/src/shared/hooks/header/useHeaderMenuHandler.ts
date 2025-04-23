import { useAtomValue, useSetAtom } from 'jotai'
import { headerMenuAtom } from '../../lib/store/header'

export const useHeaderMenuValue = () => {
  return useAtomValue(headerMenuAtom)
}

export const useHeaderMenuSetValue = () => {
  return useSetAtom(headerMenuAtom)
}

export default function useHeaderMenuHandler() {
  return {
    headerMenuValue: useHeaderMenuValue(),
    setHeaderMenuValue: useHeaderMenuSetValue()
  }
}