import { useMemo, useState } from 'react'
import Calender from '../components/Calander/Calander'
import ScheduleList from '../components/Schedule/ScheduleList'
import { useGetScheduleStatusByDate } from '../service/GqlStore/Schedule'
import { useBottomNavi } from '../components/provider/BottomNavi/useBottomNavi'
import { HeaderHandler } from '../components/provider/Header/HeaderHandler'
import { ScrollShadow } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'

function CalanderPage() {
  const { t } = useTranslation('title')
  useBottomNavi()
  HeaderHandler([t('calander')])
  const [choosenDate, changeDate] = useState('')
  const [year, month] = useMemo(() => choosenDate.split('-').map(v => +v), [choosenDate])

  const { data: monthlyStatusLoaded } = useGetScheduleStatusByDate(year, month)
  const monthlyStatus = useMemo(() => monthlyStatusLoaded?.getScheduleStatusByDate, [monthlyStatusLoaded])

  const [scrollShadow, setScrollShadow] = useState<'bottom' | 'none'>('bottom')
  function scrollShadowChange(visibility: string) {
    if (visibility === 'bottom') {
      setScrollShadow('bottom')
    } else {
      setScrollShadow('none')
    }
  }

  return (
    <div className="flex flex-col items-stretch h-full pt-4">
      <div className='px-4'>
        <Calender value={choosenDate} mode='date' onChange={changeDate} startMonth={1} startDate={1} endMonth={12} endDate={31} statesByDate={monthlyStatus} />
      </div>
      <ScrollShadow className="p-4 flex flex-col items-stretch gap-y-3" visibility={scrollShadow} onVisibilityChange={scrollShadowChange}>
        <ScheduleList choosenDate={choosenDate}></ScheduleList>
      </ScrollShadow>
    </div>
  )
}

export default CalanderPage