import type { Sets } from 'fitness-struct'

export const getSetByIds: ResponseBuilder<{ ids: number[] }, Sets.Set[]> = async (
  dbTransitionBus,
  { client },
  { ids }
) => {
  const temp = new Array(ids.length).fill('?').join(', ')
  const setList = await dbTransitionBus?.sendTransaction<Sets.Set>(
    client,
    'selects', `select * from sets where id in (${temp})`,
    ids
  )
  return setList || []
}
export const getSetById: ResponseBuilder<{ id: number }, Sets.Set | null> = async (
  dbTransitionBus,
  { client },
  { id }
) => {
  const set = await dbTransitionBus?.sendTransaction<Sets.Set>(
    client,
    'select', 'select * from sets where id=?',
    [id]
  )
  return set || null
}
export const getSetListByExerciseId: ResponseBuilder<{ id: number }, Sets.Set[]> = async (
  dbTransitionBus,
  { client },
  { id }
) => {
  const setList = await dbTransitionBus?.sendTransaction<Sets.Set>(
    client,
    'selects', 'select * from sets where exerciseId=?',
    [id]
  )
  return setList || []
}
export const createSet: ResponseBuilder<{ sets: Sets.CreateType }, Sets.Set | null> = async (
  dbTransitionBus,
  { client },
  { sets }
) => {
  const result = await dbTransitionBus?.sendTransaction<Sets.Set>(
    client,
    'insert', 'insert into sets (repeat, isDone, weightUnit, weight, duration, exerciseId) values (?,?,?,?,?,?)',
    [sets.repeat, sets.isDone ? 1 : 0, sets.weightUnit, sets.weight, sets.duration, sets.exerciseId]
  )
  return result ? result[0] : null
}

export const cloneListByExerciseId: ResponseBuilder<{ exerciseId: number, newExerciseId: number }, Sets.Set[]> = async (
  dbBus,
  { client },
  { exerciseId, newExerciseId }
) => {
  const result = await dbBus?.sendTransaction<Sets.Set>(
    client,
    'insert',
    'insert into sets (repeat, isDone, weightUnit, weight, duration, exerciseId) select repeat, 0, weightUnit, weight, duration, ? from sets where exerciseId=?',
    [
      newExerciseId,
      exerciseId
    ]
  )
  return result ? result : []
}

export const updateSet: ResponseBuilder<{ sets: Sets.Set }, Sets.Set | null> = async (
  dbTransitionBus,
  { client },
  { sets }
) => {
  const result = await dbTransitionBus?.sendTransaction<Sets.Set>(
    client,
    'update', 'update sets set repeat=?, isDone=?, weightUnit=?, weight=?, duration=? where id=?',
    [sets.repeat, sets.isDone ? 1 : 0, sets.weightUnit, sets.weight, sets.duration, sets.id]
  )
  return result ? result[0] : null
}
export const deleteSetById: ResponseBuilder<{ id: number }, string | null> = async (
  dbTransitionBus,
  { client },
  { id }
) => {
  const result = await dbTransitionBus?.sendTransaction<Sets.Set>(
    client,
    'delete', 'delete from sets where id=?',
    [id]
  )
  return result ? `delete - sets - ${id}` : null
}