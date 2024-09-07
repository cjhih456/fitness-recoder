import MessageTransactionBus from '../../transaction/MessageTransactionBus'
import { makeExecutableSchema } from '@graphql-tools/schema'
import SetsSchema from './query.gql'
import resolvers from './resolvers'

let dbTransitionBus: MessageTransactionBus<any> | undefined = undefined
export function init(txBus: MessageTransactionBus<any>) {
  dbTransitionBus = txBus
}

export const schema = makeExecutableSchema({
  typeDefs: SetsSchema,
  resolvers: resolvers(dbTransitionBus)
})
