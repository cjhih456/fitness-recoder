import MessageTransactionBus from '../../transaction/MessageTransactionBus';
import SchemaQuery from './query.gql'
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';

export default function init(txBus: MessageTransactionBus<any>) {
  return makeExecutableSchema({
    typeDefs: SchemaQuery,
    resolvers: resolvers(txBus)
  })
}
