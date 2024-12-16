import { createContext } from 'react'

export type BottomNaviType = {
  setBottomNavi: (_visible: boolean) => void
}

const context = createContext<BottomNaviType>({
  setBottomNavi: () => { },
})

export default context