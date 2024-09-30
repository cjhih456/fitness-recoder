import { useContext } from 'react'
import { RootProviderContext } from './RootProvider'

export const useRoot = () => {
  const context = useContext(RootProviderContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}
