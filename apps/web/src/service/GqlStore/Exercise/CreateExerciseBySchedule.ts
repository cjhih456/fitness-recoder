import type { MockedResponse } from '@apollo/client/testing';
import type { Exercise } from 'fitness-struct'
import { gql, useMutation } from '@apollo/client'

type CreateExerciseByScheduleResponse = {
  createExerciseBySchedule: Exercise.Data
}
type CreateExerciseByScheduleVariable = {
  exercise: { scheduleId: number, exerciseId: number[] }
}
const CreateExerciseByScheduleGql = gql`
mutation CreateExerciseBySchedule ($exercise: CreateExerciseByScheduleInput!) {
  createExerciseBySchedule(exercise: $exercise) {
    ...ExerciseFragment
  }
}
`
export function useCreateExerciseBySchedule() {
  return useMutation<
    CreateExerciseByScheduleResponse,
    CreateExerciseByScheduleVariable
  >(CreateExerciseByScheduleGql)
}
export const CreateExerciseByScheduleMock: MockedResponse<
  CreateExerciseByScheduleResponse,
  CreateExerciseByScheduleVariable
> = {
  request: {
    query: CreateExerciseByScheduleGql,
  },
  result: () => {
    return {
      data: {
        createExerciseBySchedule: {
          id: 1,
          deps: 0,
          exercise: 1
        }
      }
    }
  }
}