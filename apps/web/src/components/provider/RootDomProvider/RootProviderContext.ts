import { createContext } from 'react'

type RootContextType = {
  getRoot: () => Element
}
const RootProviderContext = createContext<RootContextType>({
  getRoot: () => document.body
})
export default RootProviderContext