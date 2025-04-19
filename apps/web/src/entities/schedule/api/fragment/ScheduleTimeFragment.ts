import { gql } from '@apollo/client';

const ScheduleTimeFragment = gql`
fragment ScheduleWithTime on ScheduleData{
  id
  type
  year
  month
  date
  start
  beforeTime
  breakTime
  workoutTimes
}`

export default ScheduleTimeFragment