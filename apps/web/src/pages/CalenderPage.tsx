import type { DateValue } from '@shared/lib/dateService';
import { ScrollShadow } from '@heroui/react'
import { Suspense, useLayoutEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGetScheduleStatusByMonth } from '@entities/schedule/api'
import { colorByScheduleType } from '@entities/schedule/lib/color';
import ScheduleListWithActions from '@features/schedule/ui/ScheduleListWithActions';
import { useHeaderSetValue } from '@shared/hooks/header';
import { DateService } from '@shared/lib/dateService';
import { default as Calender } from '@shared/ui/calender';
import { useBottomNavi } from '@widgets/bottomNavi';

function CalenderPage() {
  const { t } = useTranslation('title')
  useBottomNavi()
  const setHeader = useHeaderSetValue()
  useLayoutEffect(() => {
    setHeader(t('calender'))
  }, [t, setHeader])

  const location = useLocation()
  const navigate = useNavigate()

  const selectedDateOnHash = DateService.parseDateString(
    location.hash.replace('#', '') ||
    DateService.takeTodayDateValue()
  )
  const [choosenDate, changeDate] = useState<DateValue>(selectedDateOnHash)
  const { year, month } = choosenDate

  const choosenDateStr = DateService.formatDateValue(choosenDate)

  function changeChooseDate(chooseDate: DateValue) {
    navigate({
      ...location,
      hash: DateService.formatDateValue(chooseDate)
    }, {
      replace: true
    })
    changeDate(chooseDate)
  }

  const { data: monthlyStatusLoaded } = useGetScheduleStatusByMonth(year, month)
  const colorByDate = useMemo(
    () =>
      monthlyStatusLoaded?.getScheduleStatusByMonth?.map(colorByScheduleType),
    [monthlyStatusLoaded]
  )

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
          <ScrollShadow className="p-4 flex flex-col items-stretch gap-y-3">
            <ScheduleListWithActions choosenDate={choosenDateStr} />
          </ScrollShadow>
        </Suspense>
      </figcaption>
    </div>
  )
}

export default CalenderPage