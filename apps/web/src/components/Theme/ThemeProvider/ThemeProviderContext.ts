import { createContext } from 'react'

export type Thema = 'dark' | 'light'

type ThemaContextType = {
  theme: Thema
  toggleTheme: () => void
}

const ThemeProviderContext = createContext<ThemaContextType>({
  theme: 'dark',
  toggleTheme: () => { }
})
export default ThemeProviderContext