import type MessageTransactionBus from '../../transaction/MessageTransactionBus';
import type { IResolvers } from '@graphql-tools/utils';
import type { Fitness } from 'fitness-struct/dist/src/fitness';
import { getFitnessById, getFitnessByIds, getFitnessListByKeywords } from './service';
interface GetFitnessByIdArgs { id: number }
interface GetFitnessByIdsArgs { ids: number[] }
interface GetFitnessListByKeywordsArgs {
  name: string,
  category: string[],
  muscle: string[],
  limit: number,
  offset: number
}

const fitnessResolver = (dbTransitionBus: MessageTransactionBus | undefined): IResolvers<any, { client: string }> => {
  const getFitnessByIdShell: ResponseResolver<GetFitnessByIdArgs, Fitness.IFitness | null> = async (_, { id }, { client }) => {
    return getFitnessById(dbTransitionBus, { client }, { id })
  }
  const getFitnessbyIdsShell: ResponseResolver<GetFitnessByIdsArgs, Fitness.IFitness[] | null> = async (_, { ids }, { client }) => {
    return getFitnessByIds(dbTransitionBus, { client }, { ids })
  }
  const getFitnessListByKeywordsShell: ResponseResolver<GetFitnessListByKeywordsArgs, Fitness.IFitness[] | null> = async (_, { name, category = [], muscle = [], limit, offset }, { client }) => {
    return getFitnessListByKeywords(dbTransitionBus, { client }, { name, category, muscle, limit, offset })
  }
  return {
    Query: {
      getFitnessById: getFitnessByIdShell,
      getFitnessListByIds: getFitnessbyIdsShell,
      getFitnessListByKeywords: getFitnessListByKeywordsShell
    }
  }
}
export default fitnessResolver