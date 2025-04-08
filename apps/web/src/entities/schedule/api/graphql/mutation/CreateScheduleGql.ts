import { gql } from '@apollo/client';

const CreateScheduleGql = gql`
mutation CreateSchedule($createSchedule: CreateScheduleDataInput) {
  createSchedule(schedule: $createSchedule) {
    ...ScheduleSimple
  }
}`
export default CreateScheduleGql