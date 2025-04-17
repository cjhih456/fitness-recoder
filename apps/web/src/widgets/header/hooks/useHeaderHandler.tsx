import { useSetAtom } from 'jotai';
import { useEffect } from 'react'
import { headerContentAtom } from '../lib/atom';

export default function useHeaderHandler(header: string | undefined) {
  const setHeader = useSetAtom(headerContentAtom)
  useEffect(() => {
    setHeader(header)
  }, [header, setHeader])
  useEffect(() => () => setHeader(''), [])
}