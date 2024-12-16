import { useContext } from 'react'
import ThemaProviderContext from '@provider/ThemaProvider/ThemaProviderContext'

export default function useThema() {
  const context = useContext(ThemaProviderContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}
