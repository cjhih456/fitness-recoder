import { gql } from '@apollo/client';

const CreateExerciseBySchedule = gql`
mutation CreateExerciseBySchedule ($exercise: CreateExerciseByScheduleInput!) {
  createExerciseBySchedule(exercise: $exercise) {
    ...ExerciseWithFitnessFragment
  }
}`

export default CreateExerciseBySchedule