import { Overlay } from '@react-aria/overlays'
import MenuButton from './MenuButton'
import { MdCalendarToday, MdHome, MdList, MdOutlineDataset } from 'react-icons/md'
import { useEffect, useState } from 'react'

export default function BottomNavi() {
  const [rootDocument, setRootDocument] = useState<Element | undefined>()
  useEffect(() => {
    setRootDocument(document.querySelector('#root > div > div.app') || document.body)
  }, [])
  return <Overlay portalContainer={rootDocument}>
    <footer className="sticky flex justify-center">
      <div className="max-w-[640px] w-[640px] flex justify-center gap-x-1">
        <MenuButton name='Home' Icon={MdHome} path='/' />
        <MenuButton name='Calander' Icon={MdCalendarToday} path='/calander' />
        <MenuButton name='Exercise' Icon={MdList} path='/fitnessList' />
        <MenuButton name='Preset' Icon={MdOutlineDataset} path='/preset' />
      </div>
    </footer>
  </Overlay>
}