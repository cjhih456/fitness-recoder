import { createContext } from 'react'

export type Thema = 'dark' | 'light'

type ThemaContextType = {
  setThema: (_thema: Thema) => void
  getThema: () => Thema
}

const ThemaProviderContext = createContext<ThemaContextType>({
  setThema: () => { },
  getThema: () => 'dark'
})
export default ThemaProviderContext