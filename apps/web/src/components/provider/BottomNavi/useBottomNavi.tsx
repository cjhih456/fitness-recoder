import { useContext, useEffect } from 'react'
import BottomNaviContext from './BottomNaviContext'


export const useBottomNaviContext = () => {
  const context = useContext(BottomNaviContext)
  if (!context) {
    throw new Error('Wrong position')
  }
  return context
}

export const useBottomNavi = () => {
  const context = useBottomNaviContext()
  useEffect(() => {
    context.setBottomNavi(true)
    return () => {
      context.setBottomNavi(false)
    }
  }, [])

}