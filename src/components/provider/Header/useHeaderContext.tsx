import { isValidElement, useContext, useEffect, useMemo, useState } from 'react'
import { HeaderContext } from './HeaderProvider'


export const useHeaderContext = () => {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}

export const HeaderHandler = (header: HeaderContentType) => {
  const headerProvider = useHeaderContext()
  const [lazyHeader, setLazyHeader] = useState<HeaderContentType>([])
  useEffect(() => {
    if (JSON.stringify(lazyHeader) === JSON.stringify(header)) {
      return
    }
    setLazyHeader(header)
  }, [header])
  const headerTemp = useMemo(() => {
    return header?.map((v, i) => {
      if (isValidElement(v)) return v
      return <span className="font-bold text-lg" key={`title-${i}`}>{v}</span>
    })
  }, [header])
  useEffect(() => {
    headerProvider.setHeader(headerTemp)
    return () => {
      headerProvider.setHeader([])
    }
  }, [lazyHeader])
}