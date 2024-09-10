import MessageTransactionBus from '../../transaction/MessageTransactionBus';
import ScheduleSchema from './query.gql'
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';
import TimestampType from '../ScalaType/Timestamp';


export default function init(txBus: MessageTransactionBus<any>) {
  return makeExecutableSchema({
    typeDefs: ScheduleSchema,
    resolvers: { Timestamp: TimestampType, ...resolvers(txBus) }
  })
}
