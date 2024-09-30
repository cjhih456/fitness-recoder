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
type ScheduleByDateParams = { year: number, month: number, date: number }
export function useScheduleByDate(year: number, month: number, date: number) {
  return useQuery<{ getScheduleByDate: Schedule[] }, ScheduleByDateParams>(getScheduleByDateGql, {
    variables: {
      year, month, date
    }
  })
}
export function useLazyScheduleByDate() {
  return useLazyQuery<{ getScheduleByDate: Schedule[] }, ScheduleByDateParams>(getScheduleByDateGql)
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
export function useLazyGetScheduleById() {
  return useLazyQuery<{ getScheduleById: Schedule }, { id: number }>(getScheduleByIdGql)
}

const getScheduleStatusByDateGql = gql`
query GetScheduleStatusByDate($year: Int!, $month: Int!) {
  getScheduleStatusByDate(year: $year, month: $month)
}
`
export function useLazyGetScheduleStateByDate() {
  return useLazyQuery<{ getScheduleStatusByDate: string[] }, { year: number, month: number }>(getScheduleStatusByDateGql)
}


const createScheduleGql = gql`
mutation CreateSchedule($createSchedule: CreateScheduleDataInput) {
  createSchedule(schedule: $createSchedule) {
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
  return useMutation<{ createSchedule: Schedule }, { createSchedule: CreateSchedule }>(createScheduleGql)
}


const updateScheduleGql = gql`
mutation Mutation($updateSchedule: UpdateScheduleDataInput) {
  updateSchedule(schedule:$updateSchedule) {
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
export function useUpdateSchedule() {
  return useMutation<{ updateSchedule: Schedule }, { updateSchedule: Schedule }>(updateScheduleGql)
}


const deleteScheduleGql = gql`
mutation DeleteSchedule($id: ID!) {
  deleteSchedule(id: $id) {
    id
  }
}
`
export function useDeleteSchedule() {
  return useMutation(deleteScheduleGql)
}