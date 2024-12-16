import { gql } from '@apollo/client'

const GetScheduleByIdGql = gql`
query GetScheduleById($id: Int!) {
  getScheduleById(id: $id) {
    ...ScheduleWithTime
  }
}`

export default GetScheduleByIdGql