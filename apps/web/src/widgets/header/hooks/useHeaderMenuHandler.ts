import type { MenuType } from '../lib/atom';
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { headerMenuAtom } from '../lib/atom'

export default function useHeaderMenuHandler(menu: MenuType[]) {
  const setHeaderMenu = useSetAtom(headerMenuAtom)

  useEffect(() => {
    setHeaderMenu(menu)
    return () => {
      setHeaderMenu([])
    }
  }, [menu, setHeaderMenu])
}