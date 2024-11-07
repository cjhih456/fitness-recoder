import { useEffect, useMemo, useState } from 'react'
import Calender from '../components/Calander/Calander'
import ScheduleList from '../components/Schedule/ScheduleList'
import { useLazyGetScheduleStateByDate } from '../service/GqlStore/Schedule'
import { useBottomNavi } from '../components/provider/BottomNavi/useBottomNavi'
import { HeaderHandler } from '../components/provider/Header/HeaderHandler'
import { ScrollShadow } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'

function CalanderPage() {
  const { t } = useTranslation('title')
  useBottomNavi()
  HeaderHandler([t('calander')])
  const [choosenDate, changeDate] = useState('')
  const [monthlyStatus, setMonthlyState] = useState<string[]>([])
  const [year, month] = useMemo(() => choosenDate.split('-').map(v => +v), [choosenDate])
  const [getScheduleStateByDate] = useLazyGetScheduleStateByDate()

  useEffect(() => {
    if (year && month) {
      updateScheduleList()
    }
  }, [year, month])
  function updateScheduleList() {
    getScheduleStateByDate({ variables: { year, month } }).then((result) => {
      result.data && setMonthlyState(result.data?.getScheduleStatusByDate)
    })
  }

  const [scrollShadow, setScrollShadow] = useState<'bottom' | 'none'>('bottom')
  function scrollShadowChange(visibility: string) {
    if (visibility === 'bottom') {
      setScrollShadow('bottom')
    } else {
      setScrollShadow('none')
    }
  }

  return (
    <div className="flex flex-col items-stretch gap-y-3 px-4 h-full">
      <Calender value={choosenDate} mode='date' onChange={changeDate} startMonth={1} startDate={1} endMonth={12} endDate={31} statesByDate={monthlyStatus} />
      <ScrollShadow className="flex flex-col items-stretch gap-y-3" visibility={scrollShadow} onVisibilityChange={scrollShadowChange}>
        <ScheduleList choosenDate={choosenDate} onChangeSchedule={updateScheduleList}></ScheduleList>
      </ScrollShadow>
    </div>
  )
}

export default CalanderPage