import { useEffect, useState } from 'react'
import Calender from '../components/Calander/Calander'
import ScheduleList from '../components/Schedule/ScheduleList'
import { Divider } from '@nextui-org/react'

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
    <div className="container w-[420px] flex flex-col items-center gap-y-3">
      <Calender value={choosenDate} mode='date' onChange={changeDate} startMonth={1} startDate={1} endMonth={12} endDate={31} />
      <Divider className="bg-default-700"></Divider>
      <div>{choosenDate}</div>
      <div className='grid'>
        <ScheduleList choosenDate={choosenDate}></ScheduleList>
      </div>
    </div>
  )
}

export default Home