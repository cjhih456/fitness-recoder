import type MessageTransactionBus from '../../transaction/MessageTransactionBus';
import { makeExecutableSchema } from '@graphql-tools/schema';
import ExerciseSchema from './query.gql'
import resolvers from './resolvers';

export default function init(txBus: MessageTransactionBus) {
  return makeExecutableSchema({
    typeDefs: ExerciseSchema,
    resolvers: resolvers(txBus)
  })
}
