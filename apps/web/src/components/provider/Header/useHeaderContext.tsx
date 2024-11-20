import { useContext } from 'react'
import HeaderContext from './HeaderContext'


export const useHeaderContext = () => {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}
