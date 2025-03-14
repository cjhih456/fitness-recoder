import { createContext } from 'react'

export type Thema = 'dark' | 'light'

type ThemaContextType = {
  setThema: (_thema: Thema) => void
  getThema: () => Thema
  toggleTheme: () => void
}

const ThemaProviderContext = createContext<ThemaContextType>({
  setThema: () => { },
  getThema: () => 'dark',
  toggleTheme: () => { }
})
export default ThemaProviderContext