import { useEffect, useMemo, useState, isValidElement } from 'react'
import { useHeaderContext } from './useHeaderContext'
import { HeaderContentType, MenuType } from './HeaderContext'

export const HeaderMenuHandler = (menu: MenuType[]) => {
  const { setHeaderMenu } = useHeaderContext()
  const [lazyHeaderMenu, setLazyHeaderMenu] = useState<MenuType[]>([])
  useEffect(() => {
    if (JSON.stringify(lazyHeaderMenu) === JSON.stringify(menu)) {
      return
    }
    setLazyHeaderMenu(menu)
  }, [menu, lazyHeaderMenu])
  useEffect(() => {
    setHeaderMenu(lazyHeaderMenu)
    return () => {
      setHeaderMenu([])
    }
  }, [lazyHeaderMenu, setHeaderMenu])
}

export const HeaderHandler = (header: HeaderContentType) => {
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
      return <span className="font-bold text-lg" key={`title-${i}`}>{v}</span>
    })
  }, [lazyHeader])
  useEffect(() => {
    headerProvider.setHeaderContent(headerTemp)
    return () => {
      headerProvider.setHeaderContent([])
    }
  }, [headerProvider, headerTemp])
}