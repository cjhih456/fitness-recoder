import { createContext, ReactNode } from 'react'

export type HeaderContentType = (string | ReactNode)[] | undefined

export type HeaderMenuType = {
  key: string
  name: string
  action: () => void
}

export type HeaderContextType = {
  setHeaderContent: (_contents: HeaderContentType) => void
  getHeaderContent: () => HeaderContentType
  setHeaderMenu: (_menu: HeaderMenuType[]) => void
  getHeaderMenu: () => HeaderMenuType[]
}

const HeaderContext = createContext<HeaderContextType>({
  setHeaderContent: () => { },
  getHeaderContent: () => [],
  setHeaderMenu: () => { },
  getHeaderMenu: () => []
})

export default HeaderContext