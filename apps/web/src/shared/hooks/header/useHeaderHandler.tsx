import { useAtomValue, useSetAtom } from 'jotai';
import { headerContentAtom } from '../../lib/store/header';

export const useHeaderValue = () => {
  return useAtomValue(headerContentAtom)
}

export const useHeaderSetValue = () => {
  return useSetAtom(headerContentAtom)
}

export default function useHeaderHandler() {
  return {
    headerValue: useHeaderValue(),
    setHeaderValue: useHeaderSetValue()
  }
}