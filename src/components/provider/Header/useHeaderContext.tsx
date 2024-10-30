import { isValidElement, useContext, useEffect, useMemo, useState } from 'react'
import { HeaderContext, HeaderMenuType } from './HeaderProvider'


export const useHeaderContext = () => {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}

export const HeaderMenuHandler = (menu: HeaderMenuType[]) => {
  const { setHeaderMenu } = useHeaderContext()
  const [lazyHeaderMenu, setLazyHeaderMenu] = useState<HeaderMenuType[]>([])
  useEffect(() => {
    if (JSON.stringify(lazyHeaderMenu) === JSON.stringify(menu)) {
      return
    }
    setLazyHeaderMenu(menu)
  }, [menu])
  useEffect(() => {
    setHeaderMenu(lazyHeaderMenu)
    return () => {
      setHeaderMenu([])
    }
  }, [lazyHeaderMenu])
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
    headerProvider.setHeaderContent(headerTemp)
    return () => {
      headerProvider.setHeaderContent([])
    }
  }, [lazyHeader])
}