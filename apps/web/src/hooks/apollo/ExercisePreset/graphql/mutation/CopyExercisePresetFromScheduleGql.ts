import { gql } from '@apollo/client';

const CopyExercisePresetFromScheduleGql = gql`
mutation CopyExercisePresetFromSchedule($scheduleId: Int!, $name: String!) {
  makeScheduleByExercisePreset(scheduleId: $scheduleId, name: $name) {
    ...ExercisePresetFragment
  }
}`

export default CopyExercisePresetFromScheduleGql