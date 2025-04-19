import { z } from 'zod'
import { Category, Muscle } from './FitnessDataEnums'

export const fitnessSearchFormDataSchema = z.object({
  name: z.string(),
  category: z.array(z.nativeEnum(Category)),
  muscle: z.array(z.nativeEnum(Muscle)),
})

export const defaultFitnessSearchFormData: FitnessSearchFormData = fitnessSearchFormDataSchema.parse({
  name: '',
  category: [],
  muscle: [],
})

export type FitnessSearchFormData = z.infer<typeof fitnessSearchFormDataSchema>
