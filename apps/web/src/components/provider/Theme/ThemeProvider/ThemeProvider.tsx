import type { Thema } from './ThemeProviderContext';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import ThemeProviderContext from './ThemeProviderContext';

export interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Thema>('dark')
  const context = {
    theme,
    toggleTheme: () => setTheme((before) => before === 'dark' ? 'light' : 'dark')
  }
  useEffect(() => {
    const item = document.getElementsByTagName('html')
    item[0].setAttribute('data-theme', theme)
  }, [theme])
  return <ThemeProviderContext.Provider value={context}>
    {children}
  </ThemeProviderContext.Provider>
}