import { useContext } from 'react'
import BottomNaviContext from '@provider/BottomNaviProvider/BottomNaviContext'

export default function useBottomNaviContext() {
  const context = useContext(BottomNaviContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}