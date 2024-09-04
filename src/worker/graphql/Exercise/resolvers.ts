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
            console.log(result)
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
            console.log(result)
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
            console.log(result)
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
            console.log(result)
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
            console.log(result)
            !result ? reject(null) : resolve(result)
          }
        )
      })
    }
  }
})