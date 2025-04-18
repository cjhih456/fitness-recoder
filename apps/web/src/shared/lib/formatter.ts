import dayjs from './utils/dayjs'

export const formatTime = (time: number) => {
  return dayjs.duration(time).format('HH:mm:ss.SSS')
}

export const calcTimeDiff = (beforeTime: number, afterTime?: number) => {
  let after = afterTime ?? new Date().getTime()
  return after - beforeTime
}
