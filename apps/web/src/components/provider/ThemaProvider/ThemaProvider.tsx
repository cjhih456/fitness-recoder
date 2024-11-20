import { ReactNode, useMemo, useState } from 'react';
import ThemaProviderContext, { Thema } from './ThemaProviderContext';

export interface ThemaProviderProps {
  children: ReactNode
}

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