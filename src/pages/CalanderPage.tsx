import { useEffect, useMemo, useState } from 'react'
import Calender from '../components/Calander/Calander'
import ScheduleList from '../components/Schedule/ScheduleList'
import { useLazyGetScheduleStateByDate } from '../service/GqlStore/Schedule'
import BottomNavi from '../components/CustomComponent/BottomNavi'

function CalanderPage() {
  const [choosenDate, changeDate] = useState('')
  const [monthlyStatus, setMonthlyState] = useState<string[]>([])
  const [year, month] = useMemo(() => choosenDate.split('-').map(v => +v), [choosenDate])
  const [getScheduleStateByDate] = useLazyGetScheduleStateByDate()
  useEffect(() => {
    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const date = String(today.getDate()).padStart(2, '0')
    const todayStr = `${today.getFullYear()}-${month}-${date}`
    changeDate(todayStr)
  }, [])

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

  return (
    <div className="flex flex-col items-stretch gap-y-3 px-4">
      <Calender value={choosenDate} mode='date' onChange={changeDate} startMonth={1} startDate={1} endMonth={12} endDate={31} statesByDate={monthlyStatus} />
      <div className='grid gap-y-3'>
        <ScheduleList choosenDate={choosenDate} onChangeSchedule={updateScheduleList}></ScheduleList>
      </div>
      <BottomNavi />
    </div>
  )
}

export default CalanderPage