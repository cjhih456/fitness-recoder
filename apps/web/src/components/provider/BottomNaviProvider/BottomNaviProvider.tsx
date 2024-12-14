import { ReactNode, useCallback, useState } from 'react'
import MenuButton from '@components/CustomComponent/MenuButton'
import { MdCalendarToday, MdHome, MdList, MdOutlineDataset } from 'react-icons/md'
import { createPortal } from 'react-dom'
import { useRoot } from '@provider/RootDomProvider'
import { useTranslation } from 'react-i18next'
import BottomNaviContext, { BottomNaviType } from './BottomNaviContext'
import { useDebounceCallback } from 'usehooks-ts'

export interface BottomNaviProviderProps {
  children: ReactNode
}


export const BottomNaviProvider = ({ children }: BottomNaviProviderProps) => {
  const { t } = useTranslation('bottom')
  const [bottomNaviVisible, setBottomNaviVisible] = useState<boolean>(false)
  const { getRoot } = useRoot()

  const changeBottomNaviVisibleFunc = useCallback((v: boolean) => setBottomNaviVisible(v), [])
  const changeBottomNaviVisible = useDebounceCallback(changeBottomNaviVisibleFunc, 100)

  const contextValue = {
    setBottomNavi: changeBottomNaviVisible
  } as BottomNaviType

  return (
    <BottomNaviContext.Provider value={contextValue}>
      {children}
      {createPortal(bottomNaviVisible ? <footer className="sticky flex justify-center">
        <div className="max-w-[640px] w-[640px] flex justify-center gap-x-1">
          <MenuButton name={t('home')} Icon={MdHome} path='/' />
          <MenuButton name={t('calander')} Icon={MdCalendarToday} path='/calander' />
          <MenuButton name={t('exercise')} Icon={MdList} path='/fitnessList' />
          <MenuButton name={t('preset')} Icon={MdOutlineDataset} path='/preset' />
        </div>
      </footer> : <div></div>, getRoot(), 'bottom-navi')}
    </BottomNaviContext.Provider>
  )
}

