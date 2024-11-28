import MessageTransactionBus from '../../transaction/MessageTransactionBus';
import { IResolvers } from '@graphql-tools/utils';
import { Exercise } from 'fitness-struct'

interface getFitnessByIdArgs { id: number }
interface getFitnessByIdsArgs { ids: number[] }
interface getFitnessListByKeywordsArgs {
  name: string,
  category: string[],
  muscle: string[],
  limit: number,
  offset: number
}

export default (dbTransitionBus: MessageTransactionBus | undefined): IResolvers<any, { client: string }> => ({
  Query: {
    async getFitnessById(_source, { id }: getFitnessByIdArgs, { client }) {
      const result = await dbTransitionBus?.sendTransaction<Exercise.IFitnessDB>(
        client,
        'select',
        'select * from fitness where id=?',
        [id]
      )
      if (!result) return null
      const filteredData: Exercise.IFitness = Object.assign(result, {
        primaryMuscles: JSON.parse(result?.primaryMuscles as string),
        secondaryMuscles: JSON.parse(result?.secondaryMuscles as string),
        instructions: JSON.parse(result?.instructions as string),
        tips: JSON.parse(result?.tips as string)
      })

      return filteredData
    },
    async getFitnessListByIds(_source, { ids }: getFitnessByIdsArgs, { client }) {
      const temp = new Array(ids.length).fill('?').join(', ')
      const result = await dbTransitionBus?.sendTransaction<Exercise.IFitnessDB>(
        client,
        'selects',
        `select * from fitness where id in (${temp})`,
        ids
      )
      if (!result) return null
      return result.map(res => {
        return Object.assign(res, {
          primaryMuscles: JSON.parse(res?.primaryMuscles as string),
          secondaryMuscles: JSON.parse(res?.secondaryMuscles as string),
          instructions: JSON.parse(res?.instructions as string),
          tips: JSON.parse(res?.tips as string)
        })
      })
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
      return result.map(res => {
        return Object.assign(res, {
          primaryMuscles: JSON.parse(res?.primaryMuscles as string),
          secondaryMuscles: JSON.parse(res?.secondaryMuscles as string),
          instructions: JSON.parse(res?.instructions as string),
          tips: JSON.parse(res?.tips as string)
        })
      })
    }
  }
})