import type { ExercisePreset } from '@fitness/struct';
import {
  createExerciseByIds,
  createExerciseWithExercisePresetRelation,
  getExerciseByScheduleId
} from '../Exercise/repository';
import {
  createExercisePreset
} from './repository';

export const copyExercisePresetFromSchedule: ResponseBuilder<{ scheduleId: number, name: string }, ExercisePreset.Data | null> = async (dbBus, { client }, { scheduleId, name }) => {
  if (!dbBus) return null
  const exercisePreset = await createExercisePreset(dbBus, { client }, { exercisePreset: { name, deps: 0 } })
  if (!exercisePreset) return null
  const exerciseList = await getExerciseByScheduleId(dbBus, { client }, { scheduleId })
  if (!exerciseList) return null
  const newExerciseList = await createExerciseByIds(dbBus, { client }, { fitnessIds: exerciseList.map(v => v.fitnessId) })
  await createExerciseWithExercisePresetRelation(dbBus, { client }, { exercisePresetId: exercisePreset.id, exerciseList: newExerciseList })

  return exercisePreset
}
