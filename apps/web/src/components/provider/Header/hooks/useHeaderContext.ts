import { useContext } from 'react'
import { HeaderContext } from '../HeaderProvider'

export default function useHeaderContext() {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}
