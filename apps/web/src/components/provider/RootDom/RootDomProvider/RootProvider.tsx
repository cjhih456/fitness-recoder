import type { ReactNode } from 'react';
import {  useEffect, useState } from 'react';
import RootProviderContext from './RootProviderContext';

export interface RootProviderProps {
  children: ReactNode
  selector?: string
}

export const RootProvider = ({ children, selector }: RootProviderProps) => {
  const [root, setRoot] = useState<Element>(document.body)
  useEffect(() => {
    setRoot(document.querySelector(selector || '#root > div.app > div.app-root') || document.body)
  }, [selector])
  const context = {
    getRoot: () => root
  }

  return <RootProviderContext.Provider value={context}>
    {children}
  </RootProviderContext.Provider>
}