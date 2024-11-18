import { useContext, useEffect } from 'react'
import { BottomNavi } from './BottomNaviProvider'


export const useBottomNaviContext = () => {
  const context = useContext(BottomNavi)
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