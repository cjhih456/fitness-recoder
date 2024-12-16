import { gql } from '@apollo/client'

const UpdateScheduleGql = gql`
mutation Mutation($updateSchedule: UpdateScheduleDataInput) {
  updateSchedule(schedule:$updateSchedule) {
    ...ScheduleWithTime
  }
}`

export default UpdateScheduleGql