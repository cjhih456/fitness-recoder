import type { HeaderContentType } from '../HeaderProvider';
import { useEffect, useMemo, useState, isValidElement } from 'react'
import useHeaderContext from './useHeaderContext'

export default function useHeaderHandler(header: HeaderContentType) {
  const headerProvider = useHeaderContext()
  const [lazyHeader, setLazyHeader] = useState<HeaderContentType>([])
  useEffect(() => {
    if (JSON.stringify(lazyHeader) === JSON.stringify(header)) {
      return
    }
    setLazyHeader(header)
  }, [header, lazyHeader])
  const headerTemp = useMemo(() => {
    return lazyHeader?.map((v, i) => {
      if (isValidElement(v)) return v
      return <span className="font-bold text-lg" key={`title-${i}`
      }> {v} </span>
    })
  }, [lazyHeader])
  useEffect(() => {
    headerProvider.setHeaderContent(headerTemp)
    return () => {
      headerProvider.setHeaderContent([])
    }
  }, [headerProvider, headerTemp])
}