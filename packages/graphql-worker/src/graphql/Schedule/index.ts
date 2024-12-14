import type MessageTransactionBus from '../../transaction/MessageTransactionBus';
import { makeExecutableSchema } from '@graphql-tools/schema';
import TimestampType from '../ScalaType/Timestamp';
import ScheduleSchema from './query.gql'
import resolvers from './resolvers';

export default function init(txBus: MessageTransactionBus) {
  return makeExecutableSchema({
    typeDefs: ScheduleSchema,
    resolvers: { Timestamp: TimestampType, ...resolvers(txBus) }
  })
}
