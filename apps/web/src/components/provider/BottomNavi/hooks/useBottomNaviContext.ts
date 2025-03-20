import { useContext } from 'react'
import { BottomNaviContext } from '../BottomNaviProvider'

export default function useBottomNaviContext() {
  const context = useContext(BottomNaviContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}