import type { MenuType } from '../atom';
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { headerMenuAtom } from '../atom'

export default function useHeaderMenuHandler(menu: MenuType[]) {
  const [, setHeaderMenu] = useAtom(headerMenuAtom)

  useEffect(() => {
    setHeaderMenu(menu)
    return () => {
      setHeaderMenu([])
    }
  }, [menu, setHeaderMenu])
}