import { ReactNode, createContext, useMemo, useState } from 'react';

type Thema = 'dark' | 'light'

type ThemaContextType = {
  setThema: (thema: Thema) => void
  getThema: () => Thema
}

export interface ThemaProviderProps {
  children: ReactNode
}

export const ThemaProviderContext = createContext<ThemaContextType>({
  setThema: () => { },
  getThema: () => 'dark'
})

export const ThemaProvider = ({ children }: ThemaProviderProps) => {
  const [thema, setThema] = useState<Thema>('dark')
  const context = {
    setThema: setThema,
    getThema: () => thema
  }
  const memo = useMemo(() => children, [])
  return <ThemaProviderContext.Provider value={context}>
    {memo}
  </ThemaProviderContext.Provider>
}