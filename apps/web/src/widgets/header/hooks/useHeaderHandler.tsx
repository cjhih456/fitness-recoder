import { useSetAtom } from 'jotai';
import { useEffect } from 'react'
import { headerContentAtom } from '../lib/atom';

export default function useHeaderHandler(header?: string) {
  const setHeader = useSetAtom(headerContentAtom)
  useEffect(() => {
    if (!header) return
    setHeader(header)
  }, [header, setHeader])
  useEffect(() => () => setHeader(''), [])
  return {
    setHeader
  }
}