import { z } from 'zod';
import { IExerciesSchema } from './exercise';

export const IExercisePresetSchema = z.object({
  id: z.number(),
  name: z.string(),
  deps: z.number(),
})

export const IExercisePresetCreateSchema = IExercisePresetSchema.omit({ id: true })

export const IExercisePresetWithExerciseListSchema = IExercisePresetSchema.extend({
  exerciseList: z.array(IExerciesSchema),
})

export declare namespace ExercisePreset {
  type Data = z.infer<typeof IExercisePresetSchema>
  type CreateType = z.infer<typeof IExercisePresetCreateSchema>
  type WithExerciseList = z.infer<typeof IExercisePresetWithExerciseListSchema>
}