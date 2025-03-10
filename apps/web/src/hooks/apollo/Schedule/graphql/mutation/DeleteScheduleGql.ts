import { gql } from '@apollo/client'

const DeleteScheduleGql = gql`
mutation DeleteSchedule($id: Int!) {
  deleteSchedule(id: $id)
}`
export default DeleteScheduleGql