import { gql } from '@apollo/client'

const GetScheduleStatusByDateGql = gql`
query GetScheduleStatusByDate($year: Int!, $month: Int!) {
  getScheduleStatusByDate(year: $year, month: $month)
}`

export default GetScheduleStatusByDateGql