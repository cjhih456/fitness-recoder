import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { bottomNaviAtom } from '../lib/atom'

export default function useBottomNavi() {
  const [, setBottomNavi] = useAtom<boolean>(bottomNaviAtom)
  useEffect(() => {
    setBottomNavi(true)
    return () => {
      setBottomNavi(false)
    }
  }, [setBottomNavi])

}