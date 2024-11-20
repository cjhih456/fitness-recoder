import { ReactNode, useState } from 'react'
import HeaderContext, { HeaderContentType, HeaderContextType, HeaderMenuType } from './HeaderContext'


export interface HeaderProviderProps {
  children: ReactNode
}



export const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [headerContent, setHeaderContent] = useState<HeaderContentType>([])
  const [headerMenu, setHeaderMenu] = useState<HeaderMenuType[]>([])

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

