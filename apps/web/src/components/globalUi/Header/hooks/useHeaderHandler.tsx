import { useAtom } from 'jotai';
import { useEffect } from 'react'
import { headerContentAtom } from '../atom';

export default function useHeaderHandler(header: string | undefined) {
  const [, setHeader] = useAtom(headerContentAtom)

  useEffect(() => {
    setHeader(header)
  }, [header, setHeader])
  useEffect(() => () => setHeader(''), [])
}