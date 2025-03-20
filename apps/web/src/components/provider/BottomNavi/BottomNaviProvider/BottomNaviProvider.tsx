import type { BottomNaviType } from './BottomNaviContext';
import type { ReactNode } from 'react';
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { MdCalendarToday, MdHome, MdList, MdOutlineDataset } from 'react-icons/md'
import { useDebounceCallback } from 'usehooks-ts'
import useRootDom from '@provider/RootDom/hooks/useRootDom';
import MenuButton from '@ui/CustomComponent/MenuButton'
import StateRender from '@utils/StateRender';
import BottomNaviContext from './BottomNaviContext'

export interface BottomNaviProviderProps {
  children: ReactNode
}

export const BottomNaviProvider = ({ children }: BottomNaviProviderProps) => {
  const { t } = useTranslation('bottom')
  const [bottomNaviVisible, setBottomNaviVisible] = useState<boolean>(false)
  const { getRoot } = useRootDom()

  const changeBottomNaviVisible = useDebounceCallback(setBottomNaviVisible, 100)

  const contextValue = {
    setBottomNavi: changeBottomNaviVisible
  } as BottomNaviType

  return (
    <BottomNaviContext.Provider value={contextValue}>
      {children}
      {createPortal(<footer className="fixed bottom-0 left-0 right-0 flex justify-center bg-background">
        <StateRender.Boolean
          state={bottomNaviVisible}
          render={{
            true: <div className="max-w-[640px] w-[640px] flex justify-center gap-x-1">
              <MenuButton name={t('home')} Icon={MdHome} path='/' />
              <MenuButton name={t('calander')} Icon={MdCalendarToday} path='/calander' />
              <MenuButton name={t('exercise')} Icon={MdList} path='/fitnessList' />
              <MenuButton name={t('preset')} Icon={MdOutlineDataset} path='/preset' />
            </div>
          }}
        />
      </footer>, getRoot(), 'bottom-navi')}
    </BottomNaviContext.Provider>
  )
}
