import { useContext } from 'react'
import { ThemaProviderContext } from './ThemaProvider'

export const useThema = () => {
  const context = useContext(ThemaProviderContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}
