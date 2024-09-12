import MessageTransactionBus from '../../transaction/MessageTransactionBus';
import { IResolvers } from '@graphql-tools/utils';

async function getExerciseListByScheduleIdTemp(
  dbBus: MessageTransactionBus | undefined,
  client: string,
  scheduleId: number
): Promise<ExerciseData[] | null> {
  if (!dbBus) return Promise.resolve(null)
  return dbBus?.sendTransaction<ExerciseData[]>(client,
    'selects',
    'select e.* from exercise e left join schedule_exercise se on se.exerciseId = e.id where se.scheduleId = ?',
    [scheduleId]
  )
}

async function createExerciseByIdsTemp(
  dbBus: MessageTransactionBus | undefined,
  client: string,
  exerciseIds: number[] | number
): Promise<ExerciseData[]> {
  const temp = Array.isArray(exerciseIds) ? exerciseIds : [exerciseIds]
  const tempQuestion = new Array(temp.length).fill('(?)').join(',')
  const result = await dbBus?.sendTransaction<ExerciseData | ExerciseData[]>(client,
    'insert',
    `insert into exercise (exercise) values ${tempQuestion}`,
    temp
  )
  return Array.isArray(result) ? result : result ? [result] : []
}

async function createExerciseWithSchedule(
  dbBus: MessageTransactionBus | undefined,
  client: string,
  scheduleId: number,
  exerciseList: ExerciseData[]
): Promise<any> {
  const temp = Array(exerciseList.length).fill('(?,?)').join(',')
  const bindData = exerciseList.map(v => [scheduleId, v.id])
  return dbBus?.sendTransaction(
    client,
    'insert',
    `insert into schedule_exercise (scheduleId, exerciseId) values ${temp}`,
    bindData.flat()
  )
}

async function createExerciseWithExercisePreset(
  dbBus: MessageTransactionBus | undefined,
  client: string,
  exercisePresetId: number,
  exerciseList: ExerciseData[]
) {
  const temp = Array(exerciseList.length).fill('(?,?)').join(',')
  const bindData = exerciseList.map(v => [exercisePresetId, v.id])
  return dbBus?.sendTransaction(
    client,
    'insert',
    `insert into exercisePreset_exercise (exercisePresetId, exerciseId) values ${temp}`,
    bindData.flat()
  )
}

async function deleteExerciseByIdsTemp(
  dbBus: MessageTransactionBus | undefined,
  client: string,
  ids: number | number[]
) {
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
  return dbBus?.sendTransaction(client,
    'delete',
    `delete from exercise where id in (${tempQuestion})`,
    temp
  )
}

export default (dbTransitionBus: MessageTransactionBus | undefined): IResolvers<any, any> => ({
  Query: {
    getExerciseById(_source, { id }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction<ExerciseData>(
          context.client,
          'select',
          'select * from exercise where id=?',
          [id],
          (result: any) => {
            !result ? reject(null) : resolve(result)
          }
        )
      })
    },
    getExerciseListByIds(_source, { ids }, context) {
      return new Promise((resolve, reject) => {
        const temp = new Array(ids.length).fill('?').join(', ')
        dbTransitionBus?.sendTransaction<ExerciseData[]>(
          context.client,
          'select',
          `select * from exercise where id in (${temp})`,
          ids,
          (result: any) => {
            !result ? reject(null) : resolve(result)
          }
        )
      })
    },
    async getExerciseListByScheduleId(_source, { scheduleId }, context) {
      return await getExerciseListByScheduleIdTemp(dbTransitionBus, context.client, scheduleId)
    },
    async getExerciseByExercisePresetId(_source, { id }, context) {
      if (!dbTransitionBus) return null
      return await dbTransitionBus?.sendTransaction<ExerciseData[]>(
        context.client,
        'selects',
        'select * from exercise where id in (select exerciseId from exercisePreset_exercise where exercisePresetId = ?)',
        id
      )
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
      await createExerciseWithSchedule(
        dbTransitionBus,
        context.client,
        exercise.scheduleId,
        newExerciseList
      )
      return newExerciseList[0]
    },
    updateExercise(_source, { id, exerciseId }, context) {
      return dbTransitionBus?.sendTransaction<ExerciseData>(
        context.client,
        'update',
        'update set exercise exerciseId=? where id=?',
        [exerciseId, id]
      )
    },
    async deleteExerciseById(_source, { id }, context) {
      return deleteExerciseByIdsTemp(dbTransitionBus, context, id)
    },
    async createExerciseByExercisePreset(_source, { exercise }, context) {
      if (!dbTransitionBus) return null
      const newExerciseList = await createExerciseByIdsTemp(
        dbTransitionBus,
        context.client,
        exercise.exerciseId
      )
      await createExerciseWithExercisePreset(
        dbTransitionBus,
        context.client,
        exercise.exercisePresetId,
        newExerciseList
      )
      return newExerciseList[0]
    },
    // async updateExerciseListByScheduleId(_source, { scheduleId, exerciseList }, context) {
    //   const oldList = await getExerciseListByScheduleIdTemp(dbTransitionBus, context, scheduleId)
    //   const removeNeedExerciseData = [] as ExerciseData[]
    //   const keepExerciseData = [] as ExerciseData[]
    //   oldList.forEach((e: any) => {
    //     if (exerciseList.includes(e.exercise)) {
    //       keepExerciseData.push(e)
    //     } else {
    //       removeNeedExerciseData.push(e)
    //     }
    //   })
    //   const keepExerciseDataExercises = keepExerciseData.map(v => v.exercise)
    //   const createNeedExerciseId = exerciseList.filter((exerciseId: number) => {
    //     return !keepExerciseDataExercises.includes(exerciseId)
    //   })

    // }
  }
})