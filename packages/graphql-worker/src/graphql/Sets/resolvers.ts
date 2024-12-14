import type MessageTransactionBus from '../../transaction/MessageTransactionBus';
import type { IResolvers } from '@graphql-tools/utils';
import type { Sets } from 'fitness-struct';

export default (dbTransitionBus: MessageTransactionBus | undefined): IResolvers<any, any> => ({
  Query: {
    async getSetByIds(_source, { ids }, context) {
      const temp = new Array(ids.length).fill('?').join(', ')
      const setList = await dbTransitionBus?.sendTransaction<Sets.Sets>(
        context.client,
        'selects', `select * from sets where id in (${temp})`,
        ids
      )
      return setList || []
    },
    async getSetById(_source, { id }, context) {
      const set = await dbTransitionBus?.sendTransaction<Sets.Sets>(
        context.client,
        'select', 'select * from sets where id=?',
        [id]
      )
      return set || null
    },
    async getSetListByExerciseId(_source, { id }, context) {
      const setList = await dbTransitionBus?.sendTransaction<Sets.Sets>(
        context.client,
        'selects', 'select * from sets where exerciseId=?',
        [id]
      )
      return setList || []
    }
  },
  Mutation: {
    async createSet(_source, { sets }, context) {
      const createdResult = await dbTransitionBus?.sendTransaction<Sets.Sets>(
        context.client,
        'insert', 'INSERT INTO sets (repeat, isDone, weightUnit, weight, duration, exerciseId) values (?,?,?,?,?,?)',
        [
          sets.repeat,
          sets.isDone ? 1 : 0,
          sets.weightUnit,
          sets.weight,
          sets.duration,
          sets.exerciseId
        ],
      )
      return createdResult && createdResult[0] ? createdResult[0] : null
    },
    async updateSet(_source, { sets }, context) {
      const updateResult = await dbTransitionBus?.sendTransaction<Sets.Sets>(
        context.client,
        'update', 'UPDATE sets set repeat=?, isDone=?, weightUnit=?, weight=?, duration=? where id=?',
        [
          sets.repeat,
          sets.isDone ? 1 : 0,
          sets.weightUnit,
          sets.weight,
          sets.duration,
          sets.id
        ]
      )
      return updateResult ? updateResult[0] : null
    },
    async deleteSetById(_source, { id }, context) {
      const result = await dbTransitionBus?.sendTransaction<Sets.Sets>(
        context.client,
        'update', 'DELETE FROM sets where id=?',
        [id]
      )
      return result ? `delete - sets - ${id}` : null
    }
  }
})