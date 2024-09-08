import MessageTransactionBus from '../../transaction/MessageTransactionBus';
import { IResolvers } from '@graphql-tools/utils';

export default (dbTransitionBus: MessageTransactionBus<any> | undefined): IResolvers<any, any> => ({
  Query: {
    getExerciseById(_source, { id }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction(
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
    getExerciseByIds(_source, { ids }, context) {
      return new Promise((resolve, reject) => {
        const temp = new Array(ids.length).fill('?').join(', ')
        dbTransitionBus?.sendTransaction(
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
    getExerciseByExercisePresetId(_source, { id }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction(
          context.client,
          'selects',
          'select * from exercise where id in (select exerciseId from exercisePreset_exercise where exercisePresetId = ?)',
          id,
          (result: any) => {
            !result ? reject(null) : resolve(result)
          }
        )
      })
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
    createExercise(_source, { exercise }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction(
          context.client,
          'insert',
          'insert into exercise (exercise) values (?)',
          [exercise.exerciseId],
          (result: any) => {
            dbTransitionBus?.sendTransaction(
              context.client,
              'insert',
              'insert into schedule_exercise (exerciseId, scheduleId) values (?, ?)',
              [result.id, exercise.scheduleId],
              (result2: any) => {
                result2 ? resolve(result) : reject(null)
              }
            )
          }
        )
      })
    },
    updateExercise(_source, { id, exerciseId }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction(
          context.client,
          'update',
          'update set exercise exerciseId=? where id=?',
          [exerciseId, id],
          (result: any) => {
            result ? resolve(result) : reject(null)
          }
        )
      })
    }
  }
})