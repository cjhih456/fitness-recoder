import MessageTransactionBus from '../../transaction/MessageTransactionBus';
import ScheduleSchema from './Schedule.gql'
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';

let dbTransitionBus: MessageTransactionBus<any> | undefined = undefined

export function init(txBus: MessageTransactionBus<any>) {
  dbTransitionBus = txBus
}

export const schema = makeExecutableSchema({
  typeDefs: ScheduleSchema,
  resolvers: resolvers(dbTransitionBus)
})

