import type { HeaderContentType, HeaderContextType, MenuType } from './HeaderContext'
import type { ReactNode } from 'react'
import { useState } from 'react'
import HeaderContext from './HeaderContext'

interface HeaderProviderProps {
  children: ReactNode
}

export const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [headerContent, setHeaderContent] = useState<HeaderContentType>([])
  const [headerMenu, setHeaderMenu] = useState<MenuType[]>([])

  const contextValue = {
    setHeaderContent,
    getHeaderContent: () => {
      return headerContent
    },
    setHeaderMenu,
    getHeaderMenu() {
      return headerMenu
    }
  } as HeaderContextType

  return (
    <HeaderContext.Provider value={contextValue}>
      {children}
    </HeaderContext.Provider>
  )
}
