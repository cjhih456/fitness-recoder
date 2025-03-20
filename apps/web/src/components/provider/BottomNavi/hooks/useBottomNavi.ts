import { useEffect } from 'react'
import useBottomNaviContext from './useBottomNaviContext'

export default function useBottomNavi() {
  const context = useBottomNaviContext()
  useEffect(() => {
    context.setBottomNavi(true)
    return () => {
      context.setBottomNavi(false)
    }
  }, [context])

}