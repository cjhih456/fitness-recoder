import { useEffect, useState } from 'react'
import Calender from '../components/Calander/Calander'
import ScheduleList from '../components/Schedule/ScheduleList'

function Home() {
  const [choosenDate, changeDate] = useState('')

  useEffect(() => {
    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const date = String(today.getDate()).padStart(2, '0')
    const todayStr = `${today.getFullYear()}-${month}-${date}`
    changeDate(todayStr)
  }, [])

  return (
    <div className="flex flex-col items-stretch gap-y-3 px-4">
      <Calender value={choosenDate} mode='date' onChange={changeDate} startMonth={1} startDate={1} endMonth={12} endDate={31} />
      <div className='grid gap-y-3'>
        <ScheduleList choosenDate={choosenDate}></ScheduleList>
      </div>
    </div>
  )
}

export default Home