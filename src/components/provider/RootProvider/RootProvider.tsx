import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';


type RootContextType = {
  getRoot: () => Element
}

export interface RootProviderProps {
  children: ReactNode
}

export const RootProviderContext = createContext<RootContextType>({
  getRoot: () => document.body
})

export const RootProvider = ({ children }: RootProviderProps) => {
  const [root, setRoot] = useState<Element>(document.body)
  useEffect(() => {
    setRoot(document.querySelector('#root > div.app > div.app-root') || document.body)
  }, [])
  const context = {
    getRoot: () => root
  }
  const memo = useMemo(() => children, [])
  return <RootProviderContext.Provider value={context}>
    {memo}
  </RootProviderContext.Provider>
}