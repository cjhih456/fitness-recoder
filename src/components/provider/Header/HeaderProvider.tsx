import { ReactNode, createContext, useState } from 'react'

export interface HeaderProviderProps {
  children: ReactNode
}

type HeaderContextType = {
  setHeader: (contents: HeaderContentType) => void
  getHeaderContent: () => HeaderContentType
}

export const HeaderContext = createContext<HeaderContextType>({
  setHeader: () => { },
  getHeaderContent: () => []
})

export const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [headerContent, setHeaderContent] = useState<HeaderContentType>([])

  const contextValue = {
    setHeader: (contents) => {
      setHeaderContent(contents)
    },
    getHeaderContent: () => {
      return headerContent
    }
  } as HeaderContextType

  return (
    <HeaderContext.Provider value={contextValue}>
      {children}
    </HeaderContext.Provider>
  )
}

