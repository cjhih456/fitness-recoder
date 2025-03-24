import type MessageTransactionBus from '../../transaction/MessageTransactionBus';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import FitnessSchema from '../Fitness/query.gql'
import ExerciseSchema from './query.gql'
import resolvers from './resolvers';

export default function init(txBus: MessageTransactionBus) {
  return makeExecutableSchema({
    typeDefs: mergeTypeDefs([FitnessSchema, ExerciseSchema]),
    resolvers: resolvers(txBus)
  })
}
