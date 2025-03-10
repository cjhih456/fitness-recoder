import { gql } from '@apollo/client';

const ScheduleTimeFragment = gql`
fragment ScheduleWithTime on ScheduleData{
  id
  ...ScheduleSimple
  start
  beforeTime
  breakTime
  workoutTimes
}`

export default ScheduleTimeFragment