import type { Exercise } from '@fitness/struct';
import { IHistorySchema } from '@fitness/struct'

export const createExerciseByIds: ResponseBuilder<{ fitnessIds: number[] | number }, Exercise.Data[]> = async (
  dbBus,
  { client },
  { fitnessIds }
) => {
  const temp = Array.isArray(fitnessIds) ? fitnessIds : [fitnessIds]
  const tempQuestion = new Array(temp.length).fill('(?)').join(',')
  const result = await dbBus?.sendTransaction<Exercise.Data>(client,
    'insert',
    `insert into exercise (fitnessId) values ${tempQuestion}`,
    temp
  )
  return result || []
}

export const createExerciseWithExercisePresetRelation: ResponseBuilder<{ exercisePresetId: number, exerciseList: Exercise.Data[] }, void> = async (
  dbBus,
  { client },
  { exercisePresetId, exerciseList }
) => {
  const temp = Array(exerciseList.length).fill('(?,?)').join(',')
  const bindData = exerciseList.reduce((acc, v) => [...acc, exercisePresetId, v.id], [] as number[])
  await dbBus?.sendTransaction(
    client,
    'insert',
    `insert into exercisePreset_exercise (exercisePresetId, exerciseId) values ${temp}`,
    bindData
  )
}

export const createExerciseWithScheduleRelation: ResponseBuilder<{ scheduleId: number, exerciseList: Exercise.Data[] }, void> = async (
  dbBus,
  { client },
  { scheduleId, exerciseList }
) => {
  const temp = Array(exerciseList.length).fill('(?,?)').join(',')
  const bindData = exerciseList.reduce((acc, v) => [...acc, scheduleId, v.id], [] as number[])
  await dbBus?.sendTransaction(
    client,
    'insert',
    `insert into schedule_exercise (scheduleId, exerciseId) values ${temp}`,
    bindData
  )
}

export const getExerciseByIds: ResponseBuilder<{ ids: number[] | number }, Exercise.Data[]> = async (
  dbBus,
  { client },
  { ids }
) => {
  const temp = Array.isArray(ids) ? ids : [ids]
  const tempQuestion = new Array(temp.length).fill('?').join(',')
  const result = await dbBus?.sendTransaction<Exercise.Data>(
    client,
    'selects',
    'select * from exercise where id in (' + tempQuestion + ')',
    temp
  )
  return result ?? []
}

export const getExerciseByExercisePresetId: ResponseBuilder<{ exercisePresetId: number }, Exercise.Data[]> = async (
  dbBus,
  { client },
  { exercisePresetId }
) => {
  const result = await dbBus?.sendTransaction<Exercise.Data>(
    client,
    'selects',
    'select * from exercise where id in (select exerciseId from exercisePreset_exercise where exercisePresetId = ?)',
    [exercisePresetId]
  )
  return result ?? []
}

export const getExerciseByScheduleId: ResponseBuilder<{ scheduleId: number }, Exercise.Data[]> = async (
  dbBus,
  { client },
  { scheduleId }
) => {
  const result = await dbBus?.sendTransaction<Exercise.Data>(
    client,
    'selects',
    'select * from exercise where id in (select exerciseId from schedule_exercise where scheduleId = ?)',
    [scheduleId]
  )
  return result ?? []
}

export const updateExercise: ResponseBuilder<{ id: number, fitnessId: number }, Exercise.Data | null> = async (
  dbBus,
  { client },
  { id, fitnessId }
) => {
  const result = await dbBus?.sendTransaction<Exercise.Data>(
    client,
    'update',
    'update exercise set fitnessId = ? where id = ?',
    [fitnessId, id]
  )
  return result ? result[0] : null
}

export const deleteExerciseByIds: ResponseBuilder<{ ids: number[] | number }, string> = async (
  dbBus,
  { client },
  { ids }
) => {
  const temp = Array.isArray(ids) ? ids : [ids]
  const tempQuestion = new Array(temp.length).fill('?').join(',')
  await dbBus?.sendTransaction(client,
    'delete',
    `delete from exercise where id in (${tempQuestion})`,
    temp
  )
  return `delete - exercise - ${temp.join(',')}`
}

export const getExerciseFinishHistory: ResponseBuilder<{ exerciseId: number }, Exercise.HistoryData[]> = async (
  dbBus,
  { client },
  { exerciseId }
) => {
  const result = await dbBus?.sendTransaction<Exercise.HistoryDBData>(
    client,
    'selects',
    `select
      e.id as id,
      e.exercise as exercise,
      sch.year,
      sch.month,
      sch.date,
      sch.type,
      count(s.id) as cnt,
      SUM(
        CASE WHEN s.isDone > 0 THEN 1 ELSE 0 END
      ) as hasDone,
      group_concat(s.weight, ',') as weights,
      group_concat(s.repeat, ',') as repeats,
      s.weightUnit as weightUnit
    from exercise as e
    inner join 
      sets as s,
      schedule_exercise sche,
      schedule sch
      on
        e.id = s.exerciseId and
        sche.exerciseId = e.id and
        sch.id = sche.scheduleId
    where e.exercise=?
    group by s.exerciseId
    having cnt != 0 and hasDone = cnt
    order by e.id
    limit 10`,
    [exerciseId]
  )
  if (!result) return []
  return result.map(v => {
    return IHistorySchema.parse(v)
  })
}
