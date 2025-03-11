import { createContext } from 'react'

export type Thema = 'dark' | 'light'

type ThemaContextType = {
  getThema: () => Thema
  toggleTheme: () => void
}

const ThemaProviderContext = createContext<ThemaContextType>({
  getThema: () => 'dark',
  toggleTheme: () => { }
})
export default ThemaProviderContext