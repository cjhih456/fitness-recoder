import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next'
import { MdCalendarToday, MdHome, MdList, MdOutlineDataset } from 'react-icons/md'
import MenuButton from '@ui/CustomComponent/MenuButton'
import StateRender from '@utils/StateRender';
import { bottomNaviAtom } from '../atom';
import BottomNaviArea from './BottomNaviArea';

const BottomNavi = () => {
  const { t } = useTranslation('bottom')
  const [bottomNaviVisible] = useAtom<boolean>(bottomNaviAtom)

  return <StateRender.Boolean
    state={bottomNaviVisible}
    render={{
      true: <BottomNaviArea className="flex justify-center gap-x-1">
        <MenuButton name={t('home')} Icon={MdHome} path='/' />
        <MenuButton name={t('calender')} Icon={MdCalendarToday} path='/calender' />
        <MenuButton name={t('exercise')} Icon={MdList} path='/fitnessList' />
        <MenuButton name={t('preset')} Icon={MdOutlineDataset} path='/preset' />
      </BottomNaviArea>
    }}
  />
}

export default BottomNavi
