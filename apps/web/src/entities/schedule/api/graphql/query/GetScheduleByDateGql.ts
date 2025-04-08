import { gql } from '@apollo/client'

const GetScheduleByDateGql = gql`
query GetScheduleByDate($year: Int!, $month: Int!, $date: Int!) {
  getScheduleByDate(year: $year, month: $month, date: $date) {
    ...ScheduleSimple
  }
}`
export default GetScheduleByDateGql