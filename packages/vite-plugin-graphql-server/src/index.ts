import { Plugin, normalizePath } from 'vite';
import { ApolloServer } from '@apollo/server';
import express from 'express'
import fs from 'fs'
import { resolve } from 'path'
import Http2 from 'http2-express-bridge'
import { mergeSchemas, makeExecutableSchema } from '@graphql-tools/schema'
import { expressMiddleware } from '@apollo/server/express4';

interface options {
  path: string,
  modulePath: string[],
  useHttps: boolean
}

// GraphqlServer({
//   path: '/__graphql',
//   modulePath: [
//     './workerSrc/graphql/Schedule',
//     './workerSrc/graphql/Sets',
//     './workerSrc/graphql/Exercise',
//     './workerSrc/graphql/ExercisePreset'
//   ]
// })


export default function GraphqlServer(options: options): Plugin {
  return {
    name: 'GraphqlServer',
    apply: 'serve',
    async configureServer(server) {
      const schemas = await (Promise.all(options.modulePath.map(async (path) => {
        const gqlFile = String(fs.readFileSync(resolve(path, 'query.gql')))
        const schema = makeExecutableSchema({
          typeDefs: gqlFile,
        })
        return schema
      })))

      const apolloServer = new ApolloServer({
        schema: mergeSchemas({
          schemas: schemas
        })
      })
      await apolloServer.start()

      const expressServer = options.useHttps ? Http2(express) : express()
      expressServer.use(express.json())
      expressServer.use(expressMiddleware(apolloServer))
      server.middlewares.use(normalizePath(options.path), expressServer)
    }
  }
}