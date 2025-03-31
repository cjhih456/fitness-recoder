import type { DateValue } from '@ui/Calender/types';
import { ScrollShadow } from '@heroui/react'
import { Suspense, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useBottomNavi } from '@globalUi/BottomNavi';
import { useHeaderHandler } from '@globalUi/Header';
import { useGetScheduleStatusByMonth } from '@hooks/apollo/Schedule'
import DateService from '@ui/Calender/model/DateService';
import Calender from '@ui/Calender/ui/templates/Calender';
import ScheduleList from '@ui/Schedule/ScheduleList';

function CalenderPage() {
  const { t } = useTranslation('title')
  useBottomNavi()
  useHeaderHandler(t('calender'))

  const location = useLocation()
  const navigate = useNavigate()

  const today = DateService.takeTodayDateValue()
  const selectedDateOnHash = DateService.parseDateString(location.hash.replace('#', '') || today)
  const [choosenDate, changeDate] = useState<DateValue>(selectedDateOnHash)
  const { year, month } = choosenDate

  const choosenDateStr = DateService.formatDateValue(choosenDate)

  function changeChooseDate(chooseDate: DateValue) {
    const nowPath = location.pathname + (location.search.startsWith('?') ? '' : '?') + location.search
    navigate(nowPath + '#' + DateService.formatDateValue(chooseDate), {
      replace: true
    })
    changeDate(chooseDate)
  }

  const { data: monthlyStatusLoaded } = useGetScheduleStatusByMonth(year, month)
  const monthlyStatus = useMemo(() => monthlyStatusLoaded?.getScheduleStatusByMonth, [monthlyStatusLoaded])

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
      <figure className='px-4'>
        <Calender
          value={choosenDate}
          onChange={changeChooseDate}
          statesByMonth={monthlyStatus}
          dateRange={{
            startDate: { year: 2020, month: 1, date: 1 },
            endDate: { year: 2035, month: 1, date: 1 }
          }}
        />
      </figure>
      <figcaption>
        <Suspense>
          <ScrollShadow className="p-4 flex flex-col items-stretch gap-y-3" visibility={scrollShadow} onVisibilityChange={scrollShadowChange}>
            <ScheduleList choosenDate={choosenDateStr}></ScheduleList>
          </ScrollShadow>
        </Suspense>
      </figcaption>
    </div>
  )
}

export default CalenderPage