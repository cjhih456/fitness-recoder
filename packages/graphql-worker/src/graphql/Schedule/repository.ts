import type { Schedule } from 'fitness-struct'

export const getScheduleById: ResponseBuilder<{ id: number }, Schedule.Data | null> = async (dbTransitionBus, { client }, { id }) => {
  const schedule = await dbTransitionBus?.sendTransaction<Schedule.Data>(
    client,
    'select', 'select * from schedule where id=?',
    [id]
  )
  return schedule ?? null
}

export const getScheduleByDate: ResponseBuilder<{ year: number, month: number, date: number }, Schedule.Data[] | null> = async (dbTransitionBus, { client }, { year, month, date }) => {
  const scheduleList = await dbTransitionBus?.sendTransaction<Schedule.Data>(
    client,
    'selects', 'select * from schedule where year=? and month=? and date=?',
    [year, month, date]
  )
  return scheduleList ?? []
}

export const getScheduleStatusByMonth: ResponseBuilder<{ year: number, month: number }, string[][] | null> = async (dbTransitionBus, { client }, { year, month }) => {
  const scheduleList = await dbTransitionBus?.sendTransaction<Schedule.Data>(
    client,
    'selects', 'select year, month, date, group_concat(type) as type from schedule where year=? and month=? group by year, month, date',
    [year, month]
  )
  return scheduleList?.reduce((acc, cur) => {
    acc[cur.date] = cur.type.split(',')
    return acc
  }, [] as string[][]) ?? []
}

export const createSchedule: ResponseBuilder<{ schedule: Schedule.CreateType }, Schedule.Data | null> = async (dbTransitionBus, { client }, { schedule }) => {
  const result = await dbTransitionBus?.sendTransaction<Schedule.Data>(
    client,
    'insert', 'insert into schedule (year, month, date, type) values (?,?,?,?)',
    [schedule.year, schedule.month, schedule.date, schedule.type]
  )
  return result && result[0] ? result[0] : null
}
export const updateSchedule: ResponseBuilder<{ schedule: Schedule.Data }, Schedule.Data | null> = async (dbTransitionBus, { client }, { schedule }) => {
  const result = await dbTransitionBus?.sendTransaction<Schedule.Data>(
    client,
    'update', 'update schedule set year=?, month=?, date=?, beforeTime=?, start=?, breakTime=?, workoutTimes=?, type=? where id=?',
    [schedule.year, schedule.month, schedule.date, schedule.beforeTime, schedule.start, schedule.breakTime, schedule.workoutTimes, schedule.type, schedule.id]
  )
  return result && result[0] ? result[0] : null
}
export const deleteSchedule: ResponseBuilder<{ id: number }, string | null> = async (dbTransitionBus, { client }, { id }) => {
  const result = await dbTransitionBus?.sendTransaction<Schedule.Data>(
    client,
    'delete', 'delete from schedule where id=?',
    [id]
  )
  return result ? 'delete - schedule - ' + id : null
}
