import { gql } from '@apollo/client';

const CreateExerciseBySchedule = gql`
mutation CreateExerciseBySchedule ($exercise: CreateExerciseByScheduleInput!) {
  createExerciseBySchedule(exercise: $exercise) {
    ...ExerciseFragment
  }
}`

export default CreateExerciseBySchedule