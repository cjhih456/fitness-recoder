import { z } from 'zod';

export const IMeasureFields = z.enum(['reps', 'time', 'distance', 'weight'])

export const IWeightModifier = z.enum(['positive', 'negative'])

export const IWeightUnit = z.enum(['kg', 'lbs'])

export const IDistanceUnit = z.enum(['km', 'miles'])

export const MeasureSchema = z.object({
  requiredFields: z.array(IMeasureFields),
  optionalFields: z.array(IMeasureFields).optional(),
  weightModifier: IWeightModifier.optional(),
  weightUnit: IWeightUnit.optional(),
  distanceUnit: IDistanceUnit.optional(),
})
export declare namespace Measure {
  type WeightModifier = z.infer<typeof IWeightModifier>

  type WeightUnit = z.infer<typeof IWeightUnit>

  type DistanceUnit = z.infer<typeof IDistanceUnit>

  type IFields = z.infer<typeof IMeasureFields>

  type Measure = z.infer<typeof MeasureSchema>
}
