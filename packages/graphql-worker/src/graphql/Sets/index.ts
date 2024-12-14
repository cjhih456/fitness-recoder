import type MessageTransactionBus from '../../transaction/MessageTransactionBus'
import { makeExecutableSchema } from '@graphql-tools/schema'
import SetsSchema from './query.gql'
import resolvers from './resolvers'

export default function init(txBus: MessageTransactionBus) {
  return makeExecutableSchema({
    typeDefs: SetsSchema,
    resolvers: resolvers(txBus)
  })
}
