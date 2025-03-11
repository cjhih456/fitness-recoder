import type { Thema } from './ThemaProviderContext';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import ThemaProviderContext from './ThemaProviderContext';

export interface ThemaProviderProps {
  children: ReactNode
}

export const ThemaProvider = ({ children }: ThemaProviderProps) => {
  const [thema, setThema] = useState<Thema>('dark')
  const context = {
    getThema: () => thema,
    toggleTheme: () => setThema((before) => before === 'dark' ? 'light' : 'dark')
  }
  useEffect(() => {
    const item = document.getElementsByTagName('html')
    item[0].setAttribute('data-theme', thema)
  }, [thema])
  return <ThemaProviderContext.Provider value={context}>
    {children}
  </ThemaProviderContext.Provider>
}