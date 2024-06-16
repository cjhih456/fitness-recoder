import { isValidElement, useContext, useEffect } from 'react'
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
  useEffect(() => {
    headerProvider.setHeader(header?.map((v, i) => {
      if (isValidElement(v)) return v
      return <span className="font-bold text-lg" key={`title-${i}`}>{v}</span>
    }))
    return () => {
      headerProvider.setHeader([])
    }
  }, [])
}