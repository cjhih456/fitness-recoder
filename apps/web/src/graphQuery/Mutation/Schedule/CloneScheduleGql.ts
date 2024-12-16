import { gql } from '@apollo/client';

const CloneScheduleGql = gql`
mutation CloneSchedule($id: Int!, $targetDate: TargetDateInput) {
  cloneSchedule(id: $id, targetDate: $targetDate) {
    ...ScheduleSimple
  }
}`

export default CloneScheduleGql