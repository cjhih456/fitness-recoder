import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next'
import { MdCalendarToday, MdHome, MdList, MdOutlineDataset } from 'react-icons/md'
import BottomMenuButton from '@shared/ui/BottomMenuButton'
import { BooleanRender } from '@shared/ui/StateRender';
import { bottomNaviAtom } from '../lib/atom';
import BottomNaviArea from './BottomNaviArea';

const BottomNavi = () => {
  const { t } = useTranslation('bottom')
  const [bottomNaviVisible] = useAtom<boolean>(bottomNaviAtom)

  return <BooleanRender
    state={bottomNaviVisible}
    render={{
      true: () => <BottomNaviArea className="flex justify-center gap-x-1">
        <BottomMenuButton name={t('home')} Icon={MdHome} path='/' />
        <BottomMenuButton name={t('calender')} Icon={MdCalendarToday} path='/calender' />
        <BottomMenuButton name={t('exercise')} Icon={MdList} path='/fitnessList' />
        <BottomMenuButton name={t('preset')} Icon={MdOutlineDataset} path='/preset' />
      </BottomNaviArea>
    }}
  />
}

export default BottomNavi
