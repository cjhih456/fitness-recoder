import MessageTransactionBus from '../../transaction/MessageTransactionBus';
import { IResolvers } from '@graphql-tools/utils';

export default (dbTransitionBus: MessageTransactionBus<any> | undefined): IResolvers<any, any> => ({
  Query: {
    getExercisePresetList(_source, { page = 1, size = 10 }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction(
          context.client,
          'selects',
          'select * from exercisePreset order by deps limit ?,?',
          [(page - 1) * size, size],
          async (result: any[]) => {
            if (!result) {
              return reject(null)
            }
            const temp = await Promise.all(result.map((obj) => {
              return new Promise((resolve2) => {
                dbTransitionBus.sendTransaction(
                  context.client,
                  'selects',
                  'select * from exercisePreset_exercise where exercisePresetId=?',
                  [obj.id],
                  (result: any[]) => {
                    obj.exerciseList = result
                    resolve2(obj)
                  }
                )
              })
              return
            }))
            console.log(temp)
            resolve(temp)
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
          'insert into exercisePreset (name, deps) values (?, (select count(*) from exercisePreset))',
          [
            exercisePreset.name
          ],
          (result: any) => {
            console.log(result)
            !result ? reject(null) : resolve(result)
          }
        )
      })
    }
  }
})