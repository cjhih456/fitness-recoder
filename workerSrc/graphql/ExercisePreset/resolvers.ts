import MessageTransactionBus from '../../transaction/MessageTransactionBus';
import { IResolvers } from '@graphql-tools/utils';
import { cloneExerciseList, getExerciseListByExercisePresetIdTemp, getExerciseListByScheduleIdTemp } from '../Exercise/resolvers';

export default (dbTransitionBus: MessageTransactionBus | undefined): IResolvers<any, any> => ({
  Query: {
    async getExercisePresetList(_source, { page = 1, size = 10 }, context) {
      const exercisePresetList = await dbTransitionBus?.sendTransaction(
        context.client,
        'selects',
        'select * from exercisePreset order by deps limit ?,?',
        [(page - 1) * size, size]
      )
      if (!exercisePresetList) return []
      if (Array.isArray(exercisePresetList)) {
        await Promise.all(exercisePresetList.map(async (obj) => {
          return obj.exerciseList = await getExerciseListByExercisePresetIdTemp(
            dbTransitionBus,
            context.client,
            obj.id
          )
        }))
        return exercisePresetList
      }
    },
    async getExercisePresetByIds(_source, { ids }, context) {
      const temp = new Array(ids.length).fill('?').join(', ')
      const exercisePresetList = await dbTransitionBus?.sendTransaction<ExercisePreset[]>(
        context.client,
        'select',
        `select * from exercisePreset where id in (${temp})`,
        ids
      )
      return exercisePresetList || []
    },
    async getExercisePresetById(_source, { id }, context) {
      const exercisePreset = await dbTransitionBus?.sendTransaction<ExercisePreset>(
        context.client,
        'select',
        'select * from exercisePreset where id=?',
        [id]
      )
      return exercisePreset || null
    }
  },
  Mutation: {
    async createExercisePreset(_source, { exercisePreset }, context) {
      const createdResult = await dbTransitionBus?.sendTransaction(
        context.client,
        'insert',
        'insert into exercisePreset (name, deps) values (?, (select count(*) from exercisePreset))',
        [
          exercisePreset.name
        ],
      )
      return createdResult && createdResult[0] ? createdResult[0] : null
    },
    async updateExercisePreset(_source, { exercisePreset }, context) {
      const updatedResult = await dbTransitionBus?.sendTransaction(
        context.client,
        'update',
        'update exercisePreset set name=?, deps=? where id=?',
        [
          exercisePreset.name,
          exercisePreset.deps,
          exercisePreset.id
        ]
      )
      return updatedResult
    },
    async deleteExercisePreset(_source, { id }, context) {
      const relations = await dbTransitionBus?.sendTransaction<{ exerciseId: number }[]>(
        context.client,
        'select',
        'select exerciseId from exercisePreset_exercise where exercisePresetId=?',
        [id]
      ) || []
      const keyList = relations.map(v => v.exerciseId).join(',')
      // delete Sets
      await dbTransitionBus?.sendTransaction(
        context.client,
        'delete',
        `delete from sets where exerciseId in (${keyList})`,
        relations.map(v => v.exerciseId)
      )
      // delete exercisePreset_exercise
      await dbTransitionBus?.sendTransaction(
        context.client,
        'delete',
        'delete from exercisePreset_exercise where exercisePresetId=?',
        [id]
      )
      // delete exercises
      await dbTransitionBus?.sendTransaction(
        context.client,
        'delete',
        `delete from exercise where id in (${keyList})`,
        relations.map(v => v.exerciseId)
      )
      await dbTransitionBus?.sendTransaction(
        context.client,
        'delete',
        'delete from exercisePreset where id=?',
        [id]
      )
      return `delete - exercisePreset - ${id}`
    },
    async saveScheduleAsExercisePreset(_source, { scheduleId, name }, context) {
      const schedule = await dbTransitionBus?.sendTransaction<Schedule>(
        context.client,
        'select',
        'select * from schedule where id=?',
        [scheduleId]
      )
      if (!schedule) return null;

      const exercisePreset = await dbTransitionBus?.sendTransaction<ExercisePreset[]>(
        context.client,
        'insert',
        'insert into exercisePreset (name) values (?)',
        [name]
      )
      const exercises = await getExerciseListByScheduleIdTemp(
        dbTransitionBus,
        context.client,
        scheduleId
      );

      if (exercises && exercises.length > 0 && exercisePreset && exercisePreset[0]) {
        const newExerciseList = await cloneExerciseList(dbTransitionBus, context.client, exercises)
        const values = newExerciseList.map(v => [exercisePreset[0].id, v.id])
        const sqlPattern = Array(values.length).fill('(?,?)').join(',')
        await dbTransitionBus?.sendTransaction(
          context.client,
          'insert',
          `insert into exercisePreset_exercise (exercisePresetId, exerciseId) values ${sqlPattern}`,
          values.flat()
        );
      }
      return exercisePreset && exercisePreset[0] ? exercisePreset[0] : null
    }
  }
})