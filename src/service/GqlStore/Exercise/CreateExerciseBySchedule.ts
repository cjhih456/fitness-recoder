import { gql, useMutation } from '@apollo/client'
import { MockedResponse } from '@apollo/client/testing'


type CreateExerciseByScheduleResponse = {
  createExerciseBySchedule: ExerciseData
}
type CreateExerciseByScheduleVariable = {
  exercise: { scheduleId: number, exerciseId: number[] }
}
const CreateExerciseByScheduleGql = gql`
mutation CreateExerciseBySchedule ($exercise: CreateExerciseByScheduleInput!) {
  createExerciseBySchedule(exercise: $exercise) {
    id
    deps
    exercise
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
        createExerciseBySchedule: {} as ExerciseData
      }
    }
  }
}