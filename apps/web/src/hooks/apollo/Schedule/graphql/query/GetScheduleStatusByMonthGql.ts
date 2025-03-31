import { gql } from '@apollo/client'

const GetScheduleStatusByMonthGql = gql`
query GetScheduleStatusByMonth($year: Int!, $month: Int!) {
  getScheduleStatusByMonth(year: $year, month: $month)
}`

export default GetScheduleStatusByMonthGql