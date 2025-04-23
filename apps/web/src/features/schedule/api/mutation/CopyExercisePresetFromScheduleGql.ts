import { gql } from '@apollo/client';

const CopyExercisePresetFromScheduleGql = gql`
mutation CopyExercisePresetFromSchedule($scheduleId: Int!, $name: String!) {
  copyExercisePresetFromSchedule(scheduleId: $scheduleId, name: $name) {
    ...ExercisePresetFragment
  }
}`

export default CopyExercisePresetFromScheduleGql