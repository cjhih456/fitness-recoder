import { ReactNode, createContext, useState } from 'react'

export type HeaderMenuType = {
  key: string
  name: string
  action: () => void
}

export interface HeaderProviderProps {
  children: ReactNode
}

type HeaderContextType = {
  setHeaderContent: (contents: HeaderContentType) => void
  getHeaderContent: () => HeaderContentType
  setHeaderMenu: (menu: HeaderMenuType[]) => void
  getHeaderMenu: () => HeaderMenuType[]
}

export const HeaderContext = createContext<HeaderContextType>({
  setHeaderContent: () => { },
  getHeaderContent: () => [],
  setHeaderMenu: () => { },
  getHeaderMenu: () => []
})

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

