import type { ExercisePreset } from '@fitness/struct';

export const getExercisePresetWithListById: ResponseBuilder<{ id: number }, ExercisePreset.Data | null> = async (dbBus, { client }, { id }) => {
  if (!dbBus) return null
  const result = await dbBus.sendTransaction<ExercisePreset.Data>(client, 'select', 'select * from exercisePreset where id = ?', [id])
  return result ? result : null
}

export const getExercisePresetWithListByIds: ResponseBuilder<{ ids: number[] }, ExercisePreset.Data[] | null> = async (dbBus, { client }, { ids }) => {
  if (!dbBus) return null
  const temp = new Array(ids.length).fill('?').join(', ')
  const result = await dbBus.sendTransaction<ExercisePreset.Data>(client, 'selects', `select * from exercisePreset where id in (${temp})`, ids)
  return result ?? []
}

export const getExercisePresetWithListByOffset: ResponseBuilder<{ offset: number, size: number }, ExercisePreset.Data[] | null> = async (dbBus, { client }, { offset, size }) => {
  if (!dbBus) return null
  const result = await dbBus.sendTransaction<ExercisePreset.Data>(client, 'selects', 'select * from exercisePreset limit ?, ?', [offset, size])
  return result ?? []
}

export const createExercisePreset: ResponseBuilder<{ exercisePreset: ExercisePreset.CreateType }, ExercisePreset.Data | null> = async (dbBus, { client }, { exercisePreset }) => {
  if (!dbBus) return null
  const result = await dbBus.sendTransaction<ExercisePreset.Data>(
    client,
    'insert',
    'insert into exercisePreset (name, deps) values (?, ?)',
    [exercisePreset.name, exercisePreset.deps]
  )
  return result ? result[0] : null
}

export const updateExercisePreset: ResponseBuilder<{ exercisePreset: ExercisePreset.Data }, ExercisePreset.Data | null> = async (dbBus, { client }, { exercisePreset }) => {
  if (!dbBus) return null
  const result = await dbBus.sendTransaction<ExercisePreset.Data>(
    client,
    'update',
    'update exercisePreset set name = ?, deps = ? where id = ?',
    [exercisePreset.name, exercisePreset.deps, exercisePreset.id]
  )
  return result ? result[0] : null
}

export const deleteExercisePreset: ResponseBuilder<{ id: number }, string | null> = async (dbBus, { client }, { id }) => {
  if (!dbBus) return null
  const result = await dbBus.sendTransaction(client, 'delete', 'delete from exercisePreset where id = ?', [id])
  return result ? `delete - exercisePreset - ${id}` : null
}
