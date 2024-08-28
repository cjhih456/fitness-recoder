import { GraphQLBoolean, GraphQLEnumType, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import Sqlite3 from '../Sqlite3'
import MessageTransactionBus from '../transaction/MessageTransactionBus'

export const createSetTable = (db: Sqlite3) => {
  db.exec(`CREATE TABLE IF NOT EXISTS sets (
      id TEXT PRIMARY KEY,
      repeat INTEGER,
      isDone INTEGER,
      weightUnit TEXT,
      weight INTEGER,
      duration INTEGER
    )`)
}

const WeightUnitGraphQLType = new GraphQLEnumType({
  name: 'weightUnit',
  values: {
    kg: { value: 'kg' },
    lbs: { value: 'lbs' },
  }
})

let dbTransitionBus: MessageTransactionBus<any> | undefined = undefined
export function init(txBus: MessageTransactionBus<any>) {
  dbTransitionBus = txBus
}


const SetsType = new GraphQLObjectType({
  name: 'Sets',
  fields: {
    id: { type: GraphQLID },
    repeat: { type: GraphQLInt },
    isDone: { type: GraphQLBoolean },
    weightUnit: { type: WeightUnitGraphQLType },
    weight: { type: GraphQLInt },
    duration: { type: GraphQLInt }
  }
})

const queryType = new GraphQLObjectType({
  name: 'SetsQuery',
  fields: {
    SetsList: {
      type: new GraphQLList(SetsType),
      args: {
        id: {
          type: new GraphQLNonNull(new GraphQLList(GraphQLID))
        }
      },
      resolve(root, { id }, context) {
        return new Promise((resolve, reject) => {
          const temp = new Array(id.length).fill('?').join(', ')
          dbTransitionBus?.sendTransaction(
            context.client,
            'selects', `select * from sets where id in (${temp})`,
            [id],
            (result: any) => {
              !result ? reject(null) : resolve(result)
            }
          )
        })
      }
    },
    Sets: {
      type: SetsType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(root, { id }, context) {
        return new Promise((resolve, reject) => {
          dbTransitionBus?.sendTransaction(
            context.client,
            'select', 'select * from sets where id=?',
            [id],
            (result: any) => {
              console.log(result)
              !result ? reject(null) : resolve(result)
            }
          )
        })
      }
    }
  }
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createSet: {
      type: SetsType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        repeat: { type: new GraphQLNonNull(GraphQLInt) },
        isDone: { type: new GraphQLNonNull(GraphQLBoolean) },
        weightUnit: { type: new GraphQLNonNull(WeightUnitGraphQLType) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        duration: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(root, { id, repeat, isDone, weightUnit, weight, duration }, context) {
        return new Promise((resolve, reject) => {
          dbTransitionBus?.sendTransaction(
            context.client,
            'insert', 'INSERT INTO sets (id, repeat, isDone, weightUnit, weight, duration) values (?,?,?,?,?,?)',
            [id, repeat, isDone ? 0 : 1, weightUnit, weight, duration],
            (result: any) => {
              !result ? reject(null) : resolve({ id, repeat, isDone, weightUnit, weight, duration })
            }
          )
        })
      }
    },
    updateSet: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        repeat: { type: new GraphQLNonNull(GraphQLInt) },
        isDone: { type: new GraphQLNonNull(GraphQLBoolean) },
        weightUnit: { type: new GraphQLNonNull(WeightUnitGraphQLType) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        duration: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(_root, { id, repeat, isDone, weightUnit, weight, duration }, context) {
        return new Promise((resolve, reject) => {
          dbTransitionBus?.sendTransaction(
            context.client,
            'update', 'UPDATE sets set repeat=?, isDone=?, weightUnit=?, weight=?, duration=? where id=?',
            [repeat, isDone ? 0 : 1, weightUnit, weight, duration, id],
            (result: any) => {
              !result ? reject(null) : resolve({ id, repeat, isDone, weightUnit, weight, duration })
            }
          )
        })
      }
    },
    deleteSet: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_root, { id }, context) {
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
  }
})

export const schema = new GraphQLSchema({
  mutation: mutationType,
  query: queryType,
})
