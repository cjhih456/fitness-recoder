import type MessageTransactionBus from '../../transaction/MessageTransactionBus';
import type { IResolvers } from '@graphql-tools/utils';
import type { Exercise } from 'fitness-struct'
import { getFitnessByIds } from '../Fitness/resolvers';

export const loadFitnessByExerciseList = async (
  dbBus: MessageTransactionBus | undefined,
  client: string,
  exerciseList: Exercise.Data[]
): Promise<Exercise.DataWithFitness[]> => {
  const fitnessList = await getFitnessByIds(dbBus, client, exerciseList.map(v => v.exercise))
  return exerciseList.map(v => ({
    ...v,
    fitness: fitnessList?.find(f => f.id === v.exercise) as Exercise.IFitness
  }))
}

export const loadFitnessByExercise = async (
  dbBus: MessageTransactionBus | undefined,
  client: string,
  exercise: Exercise.Data
) => {
  const result = await loadFitnessByExerciseList(dbBus, client, [exercise])
  return result[0]
}

export async function getExerciseListByScheduleIdTemp(
  dbBus: MessageTransactionBus | undefined,
  client: string,
  scheduleId: number
): Promise<Exercise.DataWithFitness[]> {
  if (!dbBus) return []
  const result = await dbBus?.sendTransaction<Exercise.Data>(client,
    'selects',
    'select * from exercise where id in (select exerciseId from schedule_exercise where scheduleId = ?)',
    [scheduleId]
  )
  if (!result) return []
  return await loadFitnessByExerciseList(dbBus, client, result)
}

export async function getExerciseListByExercisePresetIdTemp(
  dbBus: MessageTransactionBus | undefined,
  client: string,
  exercisePresetId: number
): Promise<Exercise.DataWithFitness[]> {
  if (!dbBus) return []
  const result = await dbBus?.sendTransaction<Exercise.Data>(client,
    'selects',
    'select * from exercise where id in (select exerciseId from exercisePreset_exercise where exercisePresetId = ?)',
    [exercisePresetId]
  )
  if (!result) return []
  return await loadFitnessByExerciseList(dbBus, client, result)
}

export async function cloneExerciseList(
  dbBus: MessageTransactionBus | undefined,
  client: string,
  exerciseList: Exercise.Data[]
): Promise<Exercise.Data[]> {
  return await Promise.all(exerciseList.map(async (exercise) => {
    const newExercise = await dbBus?.sendTransaction<Exercise.Data>(
      client,
      'insert',
      'insert into exercise (exercise) values (?)',
      [exercise.exercise]
    );
    if (!newExercise || !newExercise[0]) return null
    await dbBus?.sendTransaction(
      client,
      'insert',
      'insert into sets (repeat, isDone, weightUnit, weight, duration, exerciseId) select repeat, 0, weightUnit, weight, duration, ? from sets where exerciseId=?',
      [
        newExercise[0].id,
        exercise.id
      ]
    )
    return newExercise[0]
  })).then(v => v.filter(v => v !== null))
}

async function createExerciseByIdsTemp(
  dbBus: MessageTransactionBus | undefined,
  client: string,
  exerciseIds: number[] | number
): Promise<Exercise.Data[]> {
  const temp = Array.isArray(exerciseIds) ? exerciseIds : [exerciseIds]
  const tempQuestion = new Array(temp.length).fill('(?)').join(',')
  const result = await dbBus?.sendTransaction<Exercise.Data>(client,
    'insert',
    `insert into exercise (exercise) values ${tempQuestion}`,
    temp
  )
  return result || []
}

async function createExerciseRelationWithSchedule(
  dbBus: MessageTransactionBus | undefined,
  client: string,
  scheduleId: number,
  exerciseList: Exercise.Data[]
): Promise<{ scheduleId: number, exerciseId: number }[]> {
  const temp = Array(exerciseList.length).fill('(?,?)').join(',')
  const bindData = exerciseList.map(v => [scheduleId, v.id])
  const result = await dbBus?.sendTransaction<{ scheduleId: number, exerciseId: number }>(
    client,
    'insert',
    `insert into schedule_exercise (scheduleId, exerciseId) values ${temp}`,
    bindData.flat()
  )
  return result || []
}

async function createExerciseRelationWithExercisePreset(
  dbBus: MessageTransactionBus | undefined,
  client: string,
  exercisePresetId: number,
  exerciseList: Exercise.Data[]
): Promise<{ exercisePresetId: number, exerciseId: number }[]> {
  const temp = Array(exerciseList.length).fill('(?,?)').join(',')
  const bindData = exerciseList.map(v => [exercisePresetId, v.id])
  const result = await dbBus?.sendTransaction<{ exercisePresetId: number, exerciseId: number }>(
    client,
    'insert',
    `insert into exercisePreset_exercise (exercisePresetId, exerciseId) values ${temp}`,
    bindData.flat()
  )
  return result || []
}

export async function deleteExerciseByIdsTemp(
  dbBus: MessageTransactionBus | undefined,
  client: string,
  ids: number | number[]
): Promise<string> {
  const temp = Array.isArray(ids) ? ids : [ids]
  const tempQuestion = new Array(temp.length).fill('?').join(',')
  await dbBus?.sendTransaction(client,
    'delete',
    `delete from exercisePreset_exercise where exerciseId in (${tempQuestion})`,
    temp
  )
  await dbBus?.sendTransaction(client,
    'delete',
    `delete from schedule_exercise where exerciseId in (${tempQuestion})`,
    temp
  )
  await dbBus?.sendTransaction(client,
    'delete',
    `delete from sets where exerciseId in (${tempQuestion})`,
    temp
  )
  await dbBus?.sendTransaction(client,
    'delete',
    `delete from exercise where id in (${tempQuestion})`,
    temp
  )
  return `delete - exercise - ${temp.join(',')}`
}

export default (dbTransitionBus: MessageTransactionBus | undefined): IResolvers<any, any> => ({
  Query: {
    async getExerciseById(_source, { id }, { client }) {
      const result = await dbTransitionBus?.sendTransaction<Exercise.Data>(
        client,
        'select',
        'select * from exercise where id=?',
        [id],
      )
      if (!result) return null
      return loadFitnessByExercise(dbTransitionBus, client, result)
    },
    async getExerciseListByIds(_source, { ids }, { client }) {
      const temp = new Array(ids.length).fill('?').join(', ')
      const result = await dbTransitionBus?.sendTransaction<Exercise.Data>(
        client,
        'selects',
        `select * from exercise where id in (${temp})`,
        ids,
      )
      if (!result) return []
      return loadFitnessByExerciseList(dbTransitionBus, client, result)
    },
    async getExerciseListByScheduleId(_source, { scheduleId }, context) {
      return await getExerciseListByScheduleIdTemp(
        dbTransitionBus,
        context.client,
        scheduleId
      )
    },
    async getExerciseListByExercisePresetId(_source, { exercisePresetId }, context) {
      return await getExerciseListByExercisePresetIdTemp(
        dbTransitionBus,
        context.client,
        exercisePresetId
      )
    },
    async getExerciseFinishHistory(_source, { exerciseId }, context) {
      const result = await dbTransitionBus?.sendTransaction<Exercise.HistoryData>(
        context.client,
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
      return result || []
    }
  },
  Mutation: {
    async createExerciseBySchedule(_source, { exercise }, context) {
      if (!dbTransitionBus) return null
      const newExerciseList = await createExerciseByIdsTemp(
        dbTransitionBus,
        context.client,
        exercise.exerciseId
      )
      await createExerciseRelationWithSchedule(
        dbTransitionBus,
        context.client,
        exercise.scheduleId,
        newExerciseList
      )
      return newExerciseList[0] || null
    },
    async updateExerciseListByScheduleId(_source, { scheduleId, newExercise, deleteExerciseId }, context) {
      await deleteExerciseByIdsTemp(
        dbTransitionBus,
        context.client,
        deleteExerciseId
      )
      const createdExercise = await createExerciseByIdsTemp(
        dbTransitionBus,
        context.client,
        newExercise
      )
      await createExerciseRelationWithSchedule(
        dbTransitionBus,
        context.client,
        scheduleId,
        createdExercise
      )
      return await getExerciseListByScheduleIdTemp(
        dbTransitionBus,
        context.client,
        scheduleId
      )
    },
    async createExerciseByExercisePreset(_source, { exercise }, context) {
      if (!dbTransitionBus) return null
      const newExerciseList = await createExerciseByIdsTemp(
        dbTransitionBus,
        context.client,
        exercise.exerciseId
      )
      await createExerciseRelationWithExercisePreset(
        dbTransitionBus,
        context.client,
        exercise.exercisePresetId,
        newExerciseList
      )
      return newExerciseList[0] || null
    },
    async updateExerciseListByExercisePresetId(_source, { exercisePresetId, newExercise, deleteExerciseId }, context) {
      if (deleteExerciseId.length) {
        await deleteExerciseByIdsTemp(
          dbTransitionBus,
          context.client,
          deleteExerciseId
        )
      }
      if (newExercise.length) {
        const createdExercise = await createExerciseByIdsTemp(
          dbTransitionBus,
          context.client,
          newExercise
        )
        await createExerciseRelationWithExercisePreset(
          dbTransitionBus,
          context.client,
          exercisePresetId,
          createdExercise
        )
      }
      return await getExerciseListByExercisePresetIdTemp(
        dbTransitionBus,
        context.client,
        exercisePresetId
      )
    },
    async updateExercise(_source, { id, exerciseId }, context) {
      const result = await dbTransitionBus?.sendTransaction<Exercise.Data>(
        context.client,
        'update',
        'update set exercise exerciseId=? where id=?',
        [exerciseId, id]
      )
      return result ? result[0] || null : null
    },
    async deleteExerciseById(_source, { id }, context) {
      return deleteExerciseByIdsTemp(dbTransitionBus, context, id)
    }
  }
})