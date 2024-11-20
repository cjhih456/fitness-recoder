import { createContext } from 'react'

type RootContextType = {
  getRoot: () => Element
}
export default createContext<RootContextType>({
  getRoot: () => document.body
})