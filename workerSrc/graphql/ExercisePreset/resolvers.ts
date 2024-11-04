import MessageTransactionBus from '../../transaction/MessageTransactionBus';
import { IResolvers } from '@graphql-tools/utils';
import { getExerciseListByExercisePresetIdTemp, getExerciseListByScheduleIdTemp } from '../Exercise/resolvers';

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
    getExercisePresetByIds(_source, { ids }, context) {
      return new Promise((resolve, reject) => {
        const temp = new Array(ids.length).fill('?').join(', ')
        dbTransitionBus?.sendTransaction(
          context.client,
          'select',
          `select * from exercisePreset where id in (${temp})`,
          ids,
          (result: any) => {
            !result ? reject(null) : resolve(result)
          }
        )
      })
    },
    getExercisePresetById(_source, { id }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction(
          context.client,
          'select',
          'select * from exercisePreset where id=?',
          [id],
          (result: any) => {
            !result ? reject(null) : resolve(result)
          }
        )
      })
    }
  },
  Mutation: {
    createExercisePreset(_source, { exercisePreset }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction(
          context.client,
          'insert',
          'insert into exercisePreset (name, deps) values (?, (select count(*) from exercisePreset))',
          [
            exercisePreset.name
          ],
          (result: any) => {
            !result ? reject(null) : resolve(result[0])
          }
        )
      })
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
        for (const exercise of exercises) {
          const newExercise = await dbTransitionBus?.sendTransaction<ExerciseData[]>(
            context.client,
            'insert',
            'insert into exercise (exercise) values (?)',
            [exercise.exercise]
          );

          if (newExercise && newExercise[0]) {
            await dbTransitionBus?.sendTransaction(
              context.client,
              'insert',
              'insert into exercisePreset_exercise (exercisePresetId, exerciseId) values (?,?)',
              [exercisePreset[0].id, newExercise[0].id]
            );

            await dbTransitionBus?.sendTransaction(
              context.client,
              'insert',
              'insert into sets (repeat, isDone, weightUnit, weight, duration, exerciseId) select repeat, 0, weightUnit, weight, duration, ? from sets where exerciseId=?',
              [
                newExercise[0].id,
                exercise.id
              ]
            )
          }
        }
      }
      return exercisePreset && exercisePreset[0] ? exercisePreset[0] : null
    }
  }
})