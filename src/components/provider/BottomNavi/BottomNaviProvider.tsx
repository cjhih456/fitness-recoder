import { ReactNode, createContext, useCallback, useState } from 'react'
import MenuButton from '../../CustomComponent/MenuButton'
import { MdCalendarToday, MdHome, MdList, MdOutlineDataset } from 'react-icons/md'
import { createPortal } from 'react-dom'
import _ from 'lodash'
import { useRoot } from '../RootProvider/useRoot'

export interface BottomNaviProviderProps {
  children: ReactNode
}

type BottomNaviType = {
  setBottomNavi: (visible: boolean) => void
}

export const BottomNavi = createContext<BottomNaviType>({
  setBottomNavi: () => { },
})

export const BottomNaviProvider = ({ children }: BottomNaviProviderProps) => {
  const [bottomNaviVisible, setBottomNaviVisible] = useState<boolean>(false)
  const { getRoot } = useRoot()

  const changeBottomNaviVisible = useCallback(
    _.debounce((v) => setBottomNaviVisible(v), 100),
    []
  )

  const contextValue = {
    setBottomNavi: changeBottomNaviVisible
  } as BottomNaviType

  return (
    <BottomNavi.Provider value={contextValue}>
      {children}
      {createPortal(bottomNaviVisible ? <footer className="sticky flex justify-center">
        <div className="max-w-[640px] w-[640px] flex justify-center gap-x-1">
          <MenuButton name='Home' Icon={MdHome} path='/' />
          <MenuButton name='Calander' Icon={MdCalendarToday} path='/calander' />
          <MenuButton name='Exercise' Icon={MdList} path='/fitnessList' />
          <MenuButton name='Preset' Icon={MdOutlineDataset} path='/preset' />
        </div>
      </footer> : <div></div>, getRoot(), 'bottom-navi')}
    </BottomNavi.Provider>
  )
}

