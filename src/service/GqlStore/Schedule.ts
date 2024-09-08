import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';

const getScheduleByDateGql = gql`
query GetScheduleByDate($year: Int!, $month: Int!, $date: Int!) {
  getScheduleByDate(year: $year, month: $month, date: $date) {
    id
    year
    month
    date
    beforeTime
    start
    breakTime
    workoutTimes
    type
  }
}
`

interface GetScheduleByDateReturnObj {
  getScheduleByDate: Schedule[]
}

export function useScheduleByDate(year: number, month: number, date: number) {
  return useQuery<GetScheduleByDateReturnObj>(getScheduleByDateGql, {
    variables: {
      year, month, date
    }
  })
}

export function useLazyScheduleByDate() {
  return useLazyQuery<GetScheduleByDateReturnObj>(getScheduleByDateGql)
}

const getScheduleByIdGql = gql`
query GetScheduleById($id: Int!) {
  getScheduleById(id: $id) {
    id
    year
    month
    date
    beforeTime
    start
    breakTime
    workoutTimes
    type
  }
}
`

export function useScheduleById(id: number) {
  return useQuery(getScheduleByIdGql, {
    variables: { id }
  })
}
export function useLazyScheduleById() {
  return useLazyQuery(getScheduleByIdGql)
}
const createScheduleGql = gql`
mutation CreateSchedule($schedule: CreateScheduleDataInput) {
  createSchedule(schedule: $schedule) {
    id
    year
    month
    date
    beforeTime
    start
    breakTime
    workoutTimes
    type
  }
}
`
export function useCreateSchedule() {
  return useMutation<{ createSchedule: Schedule }>(createScheduleGql)
}
const updateScheduleGql = gql`
mutation UpdateSchedule($id: Int!, $year: Int, $month: Int, $date: Int, $beforeTime: String, $start: String, $breakTime: String, $workoutTimes: Int!, $type: Int) {
  updateSchedule(id: $id, year: $year, month: $month, date: $date, beforeTime: $beforeTime, start: $start, breakTime: $breakTime, workoutTimes: $workoutTimes, type: $type) {
    id
  }
}
`
export function useUpdateSchedule() {
  return useMutation(updateScheduleGql)
}
const deleteScheduleGql = gql`
mutation DeleteSchedule($id: Int!) {
  deleteSchedule(id: $id) {
    id
  }
}
`
export function useDeleteSchedule() {
  return useMutation(deleteScheduleGql)
}