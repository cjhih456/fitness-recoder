import type { ReactNode } from 'react';
import { createContext } from 'react'

export type HeaderContentType = (string | ReactNode)[] | undefined

export type MenuType = {
  name: string
  action: () => void
}

export type HeaderContextType = {
  setHeaderContent: (_contents: HeaderContentType) => void
  getHeaderContent: () => HeaderContentType
  setHeaderMenu: (_menu: MenuType[]) => void
  getHeaderMenu: () => MenuType[]
}

const HeaderContext = createContext<HeaderContextType>({
  setHeaderContent: () => { },
  getHeaderContent: () => [],
  setHeaderMenu: () => { },
  getHeaderMenu: () => []
})

export default HeaderContext