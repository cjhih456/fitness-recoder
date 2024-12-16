import type MessageTransactionBus from '../../transaction/MessageTransactionBus';
import type { IResolvers } from '@graphql-tools/utils';
import type { ExercisePreset, Schedule } from 'fitness-struct';
import { cloneExerciseList, getExerciseListByExercisePresetIdTemp, getExerciseListByScheduleIdTemp } from '../Exercise/resolvers';

export default (dbTransitionBus: MessageTransactionBus | undefined): IResolvers<any, any> => ({
  Query: {
    async getExercisePresetWithListById(_source, { id }, context) {
      const exercisePreset = await dbTransitionBus?.sendTransaction<ExercisePreset.PresetWithExerciseList>(
        context.client,
        'select',
        'select * from exercisePreset where id = ?',
        [id]
      )
      if (!exercisePreset) return null
      exercisePreset.exerciseList = await getExerciseListByExercisePresetIdTemp(
        dbTransitionBus,
        context.client,
        exercisePreset.id
      )
      return exercisePreset
    },
    async getExercisePresetWithListList(_source, { offset = 0, size = 10 }, context) {
      const exercisePresetList = await dbTransitionBus?.sendTransaction<ExercisePreset.PresetWithExerciseList>(
        context.client,
        'selects',
        'select * from exercisePreset order by id desc limit ?,?',
        [offset, size]
      )
      if (!exercisePresetList) return []
      await Promise.all(exercisePresetList.map(async (obj) => {
        return obj.exerciseList = await getExerciseListByExercisePresetIdTemp(
          dbTransitionBus,
          context.client,
          obj.id
        )
      }))
      return exercisePresetList
    },
    async getExercisePresetByIds(_source, { ids }, context) {
      const temp = new Array(ids.length).fill('?').join(', ')
      const exercisePresetList = await dbTransitionBus?.sendTransaction<ExercisePreset.Preset>(
        context.client,
        'selects',
        `select * from exercisePreset where id in (${temp})`,
        ids
      )
      return exercisePresetList || []
    },
    async getExercisePresetById(_source, { id }, context) {
      const exercisePreset = await dbTransitionBus?.sendTransaction<ExercisePreset.Preset>(
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
      const createdResult = await dbTransitionBus?.sendTransaction<ExercisePreset.Preset>(
        context.client,
        'insert',
        'insert into exercisePreset (name, deps) values (?, 0)',
        [
          exercisePreset.name
        ],
      )
      return createdResult ? createdResult[0] : null
    },
    async updateExercisePreset(_source, { exercisePreset }, context) {
      const updatedResult = await dbTransitionBus?.sendTransaction<ExercisePreset.Preset>(
        context.client,
        'update',
        'update exercisePreset set name=?, deps=? where id=?',
        [
          exercisePreset.name,
          exercisePreset.deps,
          exercisePreset.id
        ]
      )
      return updatedResult ? updatedResult[0] : null
    },
    async deleteExercisePreset(_source, { id }, context) {
      const relations = await dbTransitionBus?.sendTransaction<{ exerciseId: number }>(
        context.client,
        'selects',
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
    async copyExercisePresetFromSchedule(_source, { scheduleId, name }, context) {
      const schedule = await dbTransitionBus?.sendTransaction<Schedule.Schedule>(
        context.client,
        'select',
        'select * from schedule where id=?',
        [scheduleId]
      )
      if (!schedule) return null;

      const exercisePreset = await dbTransitionBus?.sendTransaction<ExercisePreset.Preset>(
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
      return exercisePreset ? exercisePreset[0] : null
    }
  }
})