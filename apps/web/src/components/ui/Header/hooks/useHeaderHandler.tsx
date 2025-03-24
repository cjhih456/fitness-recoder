import { useAtom } from 'jotai';
import { useEffect } from 'react'
import { headerContentAtom } from '@ui/Header/atom';

export default function useHeaderHandler(header: string | undefined) {
  const [, setHeader] = useAtom(headerContentAtom)

  useEffect(() => {
    setHeader(header)
    return () => {
      setHeader('')
    }
  }, [header, setHeader])
}