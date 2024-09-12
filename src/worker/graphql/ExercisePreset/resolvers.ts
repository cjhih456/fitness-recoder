import MessageTransactionBus from '../../transaction/MessageTransactionBus';
import { IResolvers } from '@graphql-tools/utils';

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
        await Promise.all(exercisePresetList.map((obj) => {
          return dbTransitionBus?.sendTransaction(
            context.client,
            'selects',
            'select * from exercise where id in (select exerciseId from exercisePreset_exercise where exercisePresetId=?)',
            [obj.id],
            (result: any[]) => {
              obj.exerciseList = result
            }
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
            console.log(result)
            !result ? reject(null) : resolve(result)
          }
        )
      })
    },
    // async setExerciseListByExercisePreset(_source, { id, exerciseList }, context) {
    //   const list = await dbTransitionBus?.sendTransaction(
    //     context.client,
    //     'selects',
    //     'select * from exercise where id in (select exerciseId from exercisePreset_exercise where exercisePresetId=?)',
    //     [id]
    //   )
    //   const deleteNeed = []
    //   const createNeed = []

    //   exerciseList

    //   return new Promise(async (resolve, reject) => {
    //     // dbTransitionBus?.sendTransaction(
    //     //   context.client,
    //     //   'insert',
    //     //   'insert into exercise (name, deps) values (?)',
    //     //   [
    //     //     exercisePreset.name
    //     //   ],
    //     //   (result: any) => {
    //     //     console.log(result)
    //     //     !result ? reject(null) : resolve(result)
    //     //   }
    //     // )
    //   })
    // }
  }
})