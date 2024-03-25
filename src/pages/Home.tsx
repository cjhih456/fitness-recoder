import { useEffect, useState } from 'react'
import Calender from '../components/Calander'

function Home() {
  
  const [choosenDate, changeDate] = useState('')
  useEffect(() => {
    const today = new Date()
    const todayStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    changeDate(todayStr)
  }, [])
  return (
    <div>
      <Calender value={choosenDate} mode='date' onChange={changeDate} startMonth={1} startDate={1} endMonth={12} endDate={31} />
    </div>
  )
}

export default Home