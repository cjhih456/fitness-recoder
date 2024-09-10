import MessageTransactionBus from '../../transaction/MessageTransactionBus';
import { IResolvers } from '@graphql-tools/utils';

export default (dbTransitionBus: MessageTransactionBus<any> | undefined): IResolvers<any, any> => ({
  Query: {
    getSetByIds(_source, { ids }, context) {
      return new Promise((resolve, reject) => {
        const temp = new Array(ids.length).fill('?').join(', ')
        dbTransitionBus?.sendTransaction(
          context.client,
          'selects', `select * from sets where id in (${temp})`,
          ids,
          (result: any) => {
            !result ? reject(null) : resolve(result)
          }
        )
      })
    },
    getSetById(_source, { id }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction(
          context.client,
          'select', 'select * from sets where id=?',
          [id],
          (result: any) => {
            result ? resolve(result) : reject(null)
          }
        )
      })
    },
    getSetListByExerciseId(_source, { id }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction(
          context.client,
          'selects', 'select * from sets where exerciseId=?',
          [id],
          (result: any) => {
            result ? resolve(result) : reject(null)
          }
        )
      })
    }
  },
  Mutation: {
    createSet(_source, { sets }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction(
          context.client,
          'insert', 'INSERT INTO sets (repeat, isDone, weightUnit, weight, duration, exerciseId) values (?,?,?,?,?,?)',
          [
            sets.repeat,
            sets.isDone ? 0 : 1,
            sets.weightUnit,
            sets.weight,
            sets.duration,
            sets.exerciseId
          ],
          (result: any) => {
            result ? resolve({ ...result, ...sets }) : reject(null)
          }
        )
      })
    },
    updateSet(_source, { sets }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction(
          context.client,
          'update', 'UPDATE sets set repeat=?, isDone=?, weightUnit=?, weight=?, duration=? where id=?',
          [
            sets.repeat,
            sets.isDone ? 1 : 0,
            sets.weightUnit,
            sets.weight,
            sets.duration,
            sets.id
          ],
          (result: any) => {
            result ? resolve(sets) : reject(null)
          }
        )
      })
    },
    deleteSetById(_source, { id }, context) {
      return new Promise((resolve, reject) => {
        dbTransitionBus?.sendTransaction(
          context.client,
          'update', 'DELETE FROM sets where id=?',
          [id],
          (result: any) => {
            !result ? reject(null) : resolve(`Sets - delete - ${id}`)
          }
        )
      })
    }
  }
})