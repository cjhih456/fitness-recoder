import { z } from 'zod';

export const IFitnessMuscle = z.enum([
  'abdominals',
  'hamstrings',
  'calves',
  'shoulders',
  'adductors',
  'glutes',
  'quadriceps',
  'biceps',
  'forearms',
  'abductors',
  'triceps',
  'chest',
  'lower_back',
  'traps',
  'middle_back',
  'lats',
  'neck',
])

export const IFitnessForce = z.enum([
  'pull',
  'push',
  'static',
])

export const IFitnessLevel = z.enum([
  'beginner',
  'intermediate',
  'expert',
])

export const IFitnessMechanic = z.enum([
  'compound',
  'isolation',
])

export const IFitnessEquipment = z.enum([
  'body_only',
  'machine',
  'kettlebells',
  'dumbbell',
  'cable',
  'barbell',
  'bands',
  'medicine_ball',
  'exercise_ball',
  'e-z_curl_bar',
  'foam_roll',
  'other',
])

export const IFitnessCategory = z.enum([
  'strength',
  'stretching',
  'plyometrics',
  'strongman',
  'powerlifting',
  'cardio',
  'olympic_weightlifting',
  'crossfit',
  'weighted_bodyweight',
  'assisted_bodyweight',
])

export const IFitnessDBSchema = z.object({
  id: z.number(),
  name: z.string(),
  aliases: z.string().optional().or(z.null()),
  primaryMuscles: z.string(),
  secondaryMuscles: z.string(),
  force: IFitnessForce.optional().or(z.null()),
  level: IFitnessLevel,
  mechanic: IFitnessMechanic.optional().or(z.null()),
  equipment: IFitnessEquipment.optional().or(z.null()),
  category: IFitnessCategory,
  instructions: z.string(),
  description: z.string().optional().or(z.null()),
  tips: z.string().optional().or(z.null()),
})

export const IFitnessSchema = IFitnessDBSchema.transform((fitness) => ({
  ...fitness,
  description: fitness.description ?? '',
  equipment: fitness.equipment ?? 'other',
  aliases: JSON.parse(fitness.aliases ?? '[]') as string[],
  primaryMuscles: JSON.parse(fitness.primaryMuscles) as Fitness.IMuscle[],
  secondaryMuscles: JSON.parse(fitness.secondaryMuscles) as Fitness.IMuscle[],
  instructions: JSON.parse(fitness.instructions) as string[],
  tips: JSON.parse(fitness.tips ?? '[]') as string[],
}))

export const IFitnessSelected = IFitnessDBSchema.extend({
  selected: z.boolean()
})

export declare namespace Fitness {
  type IMuscle = z.infer<typeof IFitnessMuscle>
  type IForce = z.infer<typeof IFitnessForce>
  type ILevel = z.infer<typeof IFitnessLevel>
  type IMechanic = z.infer<typeof IFitnessMechanic>
  type IEquipment = z.infer<typeof IFitnessEquipment>
  type ICategory = z.infer<typeof IFitnessCategory>
  type IFitness = z.infer<typeof IFitnessSchema>
  type IFitnessDB = z.infer<typeof IFitnessDBSchema>
  type IFitnessSelected = z.infer<typeof IFitnessSelected>
}