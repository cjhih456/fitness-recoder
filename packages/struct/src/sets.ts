import { z } from 'zod';
import { IWeightUnit } from './measure';
export const SetSchema = z.object({
  id: z.number(),
  exerciseId: z.number(),
  repeat: z.number(),
  isDone: z.boolean(),
  weightUnit: IWeightUnit,
  weight: z.number().optional(),
  duration: z.number().optional(),
})

export const ISetCreateSchema = SetSchema.omit({ id: true })

export declare namespace Sets {
  type CreateType = z.infer<typeof ISetCreateSchema>
  type Set = z.infer<typeof SetSchema>
}