import { gql } from '@apollo/client'

const ScheduleSimpleFragment = gql`
fragment ScheduleSimple on ScheduleData{
  id
  type
  year
  month
  date
}`

export default ScheduleSimpleFragment