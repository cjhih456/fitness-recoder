import type { MenuType } from '../HeaderProvider'
import { useEffect, useState } from 'react'
import useHeaderContext from './useHeaderContext'

export default function useHeaderMenuHandler(menu: MenuType[]) {
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