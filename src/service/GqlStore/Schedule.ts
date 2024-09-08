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
export function useScheduleByDate(year: number, month: number, date: number) {
  return useQuery<{ getScheduleByDate: Schedule[] }>(getScheduleByDateGql, {
    variables: {
      year, month, date
    }
  })
}
export function useLazyScheduleByDate() {
  return useLazyQuery<{ getScheduleByDate: Schedule[] }>(getScheduleByDateGql)
}


const getScheduleByIdGql = gql`
query GetScheduleById($id: ID!) {
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
export function useGetScheduleById(id: number) {
  return useQuery<{ getScheduleById: Schedule }>(getScheduleByIdGql, {
    variables: { id: Number(id) }
  })
}
export function useGetLazyScheduleById() {
  return useLazyQuery<{ getScheduleById: Schedule }>(getScheduleByIdGql)
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