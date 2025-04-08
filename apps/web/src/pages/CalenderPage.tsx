import type { DateValue } from '@shared/lib/dateService';
import { ScrollShadow } from '@heroui/react'
import { Suspense, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGetScheduleStatusByMonth } from '@entities/schedule/api'
import { colorByScheduleType } from '@entities/schedule/lib/color';
import ScheduleList from '@entities/schedule/ui/ScheduleList';
import { DateService } from '@shared/lib/dateService';
import { useBottomNavi } from '@widgets/bottomNavi';
import { default as Calender } from '@widgets/calender';
import { useHeaderHandler } from '@widgets/header';

function CalenderPage() {
  const { t } = useTranslation('title')
  useBottomNavi()
  useHeaderHandler(t('calender'))

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
            <ScheduleList choosenDate={choosenDateStr}></ScheduleList>
          </ScrollShadow>
        </Suspense>
      </figcaption>
    </div>
  )
}

export default CalenderPage