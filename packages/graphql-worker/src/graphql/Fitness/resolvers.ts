import type MessageTransactionBus from '../../transaction/MessageTransactionBus';
import type { IResolvers } from '@graphql-tools/utils';
import type { Exercise } from 'fitness-struct'

interface getFitnessByIdArgs { id: number }
interface getFitnessByIdsArgs { ids: number[] }
interface getFitnessListByKeywordsArgs {
  name: string,
  category: string[],
  muscle: string[],
  limit: number,
  offset: number
}

const parseFitness = (fitness: Exercise.IFitnessDB): Exercise.IFitness => Object.assign(fitness, {
  primaryMuscles: JSON.parse(fitness?.primaryMuscles as string),
  secondaryMuscles: JSON.parse(fitness?.secondaryMuscles as string),
  instructions: JSON.parse(fitness?.instructions as string),
  tips: JSON.parse(fitness?.tips as string)
})

export const getFitnessById = async (dbTransitionBus: MessageTransactionBus | undefined, client: string, fitnessId: number) => {
  const result = await dbTransitionBus?.sendTransaction<Exercise.IFitnessDB>(
    client,
    'select',
    'select * from fitness where id=?',
    [fitnessId]
  )
  if (!result) return null
  return parseFitness(result)
}

export const getFitnessByIds = async (dbTransitionBus: MessageTransactionBus | undefined, client: string, fitnessIds: number[]) => {
  const temp = new Array(fitnessIds.length).fill('?').join(', ')
  const result = await dbTransitionBus?.sendTransaction<Exercise.IFitnessDB>(
    client,
    'selects',
    `select * from fitness where id in (${temp})`,
    fitnessIds
  )
  if (!result) return null
  return result.map(res => parseFitness(res))
}

const fitnessResolver = (dbTransitionBus: MessageTransactionBus | undefined): IResolvers<any, { client: string }> => ({
  Query: {
    getFitnessById(_source, { id }: getFitnessByIdArgs, { client }) {
      return getFitnessById(dbTransitionBus, client, id)
    },
    getFitnessListByIds(_source, { ids }: getFitnessByIdsArgs, { client }) {
      return getFitnessByIds(dbTransitionBus, client, ids)
    },
    async getFitnessListByKeywords(_source, { name, category = [], muscle = [], limit, offset }: getFitnessListByKeywordsArgs, { client }) {
      const whereQuery = []
      const argsQuery = []
      if (name) {
        whereQuery.push('name like ?')
        argsQuery.push(`%${name}%`)
      }
      if (category.length) {
        const temp1 = new Array(category.length).fill('?')
        whereQuery.push(`category in (${temp1.join(', ')})`)
        argsQuery.push(...category)
      }
      if (muscle.length) {
        muscle.forEach((m) => {
          whereQuery.push('totalUseMuscles like ?')
          argsQuery.push(`%${m}%`)
        })
      }
      const query = `select * from fitness ${whereQuery.length ? 'where ' + whereQuery.join(' and ') : ''} limit ?,?`
      const result = await dbTransitionBus?.sendTransaction<Exercise.IFitnessDB>(
        client,
        'selects',
        query,
        [...argsQuery, offset, limit]
      )
      if (!result) return []
      return result.map(res => parseFitness(res))
    }
  }
})
export default fitnessResolver