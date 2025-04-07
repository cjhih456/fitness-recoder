import type { DateValue } from '@widgets/calender';
import { ScrollShadow } from '@heroui/react'
import { Suspense, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { colorByScheduleType } from '@entities/schedule/lib/color';
import { useGetScheduleStatusByMonth } from '@hooks/apollo/Schedule'
import ScheduleList from '@ui/Schedule/ScheduleList';
import { useBottomNavi } from '@widgets/bottomNavi';
import { DateService, default as Calender } from '@widgets/calender';
import { useHeaderHandler } from '@widgets/header';

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
  const colorByDate = useMemo(() =>
    monthlyStatusLoaded?.getScheduleStatusByMonth?.map((v, i) =>
      colorByScheduleType(DateService.isEqual(choosenDate, {
        ...choosenDate,
        date: i + 1
      }), v)
    ), [monthlyStatusLoaded, choosenDate])

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
          colorByDate={colorByDate}
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