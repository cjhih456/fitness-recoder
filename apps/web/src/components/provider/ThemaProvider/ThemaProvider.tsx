import type { Thema } from './ThemaProviderContext';
import type { ReactNode } from 'react';
import {  useState } from 'react';
import ThemaProviderContext from './ThemaProviderContext';

export interface ThemaProviderProps {
  children: ReactNode
}

export const ThemaProvider = ({ children }: ThemaProviderProps) => {
  const [thema, setThema] = useState<Thema>('dark')
  const context = {
    setThema: setThema,
    getThema: () => thema
  }
  return <ThemaProviderContext.Provider value={context}>
    {children}
  </ThemaProviderContext.Provider>
}