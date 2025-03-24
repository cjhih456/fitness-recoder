import type { Mode } from '@ui/Calander/Calander';
import { ScrollShadow } from '@heroui/react'
import { Suspense, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGetScheduleStatusByDate } from '@hooks/apollo/Schedule'
import useBottomNavi from '@ui/BottomNavi/hooks/useBottomNavi';
import Calender from '@ui/Calander/Calander';
import useHeaderHandler from '@ui/Header/hooks/useHeaderHandler';
import ScheduleList from '@ui/Schedule/ScheduleList';

function CalanderPage() {
  const { t } = useTranslation('title')
  useBottomNavi()
  useHeaderHandler(t('calander'))

  const location = useLocation()
  const navigate = useNavigate()
  const todayYear = new Date().getFullYear()
  const todayMonth = new Date().getMonth() + 1
  const todayDate = new Date().getDate()

  const [calanderMode, changeCalanderMode] = useState<Mode>('date')
  const [choosenDate, changeDate] = useState(location.hash.replace('#', '') || `${todayYear}-${todayMonth}-${todayDate}`)

  function changeChooseDate(chooseDate: string) {
    const nowPath = location.pathname + (location.search.startsWith('?') ? '' : '?') + location.search
    navigate(nowPath + '#' + chooseDate, {
      replace: true
    })
    changeDate(chooseDate)
  }

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
        <Calender
          value={choosenDate}
          mode={calanderMode}
          onChangeMode={changeCalanderMode}
          onChange={changeChooseDate}
          statesByDate={monthlyStatus}
          startDate='2020-1-1'
          endDate='2035-1-1'
        />
      </div>
      <Suspense>
        <ScrollShadow className="p-4 flex flex-col items-stretch gap-y-3" visibility={scrollShadow} onVisibilityChange={scrollShadowChange}>
          <ScheduleList choosenDate={choosenDate}></ScheduleList>
        </ScrollShadow>
      </Suspense>
    </div>
  )
}

export default CalanderPage