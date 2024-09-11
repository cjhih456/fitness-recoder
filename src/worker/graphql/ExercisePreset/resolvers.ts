import MessageTransactionBus from '../../transaction/MessageTransactionBus';
import { IResolvers } from '@graphql-tools/utils';

export default (dbTransitionBus: MessageTransactionBus<any> | undefined): IResolvers<any, any> => ({
  Query: {
    getExercisePresetList(_source, { page = 1, size = 10 }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction(
          context.client,
          'selects',
          'select * from exercisePreset where id in order by deps limit ?,?',
          [(page - 1) * size, size],
          (result: any) => {
            result ? resolve(result) : reject(null)
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
    createExercisePreset(_source, { exercisePreset }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction(
          context.client,
          'insert',
          'insert into exercisePreset set (name) values (?)',
          [
            exercisePreset.name
          ],
          (result: any) => {
            !result ? reject(null) : resolve(result)
          }
        )
      })
    }
  }
})