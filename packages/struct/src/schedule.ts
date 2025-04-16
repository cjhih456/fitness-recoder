import { z } from 'zod';
import { IExerciesSchema } from './exercise';

export const IScheduleTypeSchema = z.enum(['BREAK', 'SCHEDULED', 'STARTED', 'PAUSED', 'FINISH'])

export const IScheduleSchema = z.object({
  id: z.number(),
  year: z.number(),
  month: z.number(),
  date: z.number(),
  type: IScheduleTypeSchema,
  start: z.number(),
  beforeTime: z.number(),
  breakTime: z.number(),
  workoutTimes: z.number(),
})

export const IScheduleCreateSchema = IScheduleSchema.pick({
  year: true,
  month: true,
  date: true,
  type: true
})

export const IScheduleWithExerciseListSchema = IScheduleSchema.extend({
  exerciseList: z.array(IExerciesSchema),
})
export declare namespace Schedule {
  type IType = z.infer<typeof IScheduleTypeSchema>
  type CreateType = z.infer<typeof IScheduleCreateSchema>
  type Data = z.infer<typeof IScheduleSchema>
  type WithExerciseList = z.infer<typeof IScheduleWithExerciseListSchema>
}