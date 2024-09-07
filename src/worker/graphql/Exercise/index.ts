import MessageTransactionBus from '../../transaction/MessageTransactionBus';
import ExerciseSchema from './query.gql'
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';

export default function init(txBus: MessageTransactionBus<any>) {
  return makeExecutableSchema({
    typeDefs: ExerciseSchema,
    resolvers: resolvers(txBus)
  })
}
