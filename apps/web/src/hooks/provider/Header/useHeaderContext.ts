import { useContext } from 'react'
import HeaderContext from '@provider/HeaderProvider/HeaderContext'

export default function useHeaderContext() {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}
