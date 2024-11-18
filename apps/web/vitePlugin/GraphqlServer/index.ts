import { PluginOption, normalizePath } from 'vite';
import { ApolloServer } from '@apollo/server';
import express from 'express'
import fs from 'fs'
import Http2 from 'http2-express-bridge'
import { mergeSchemas, makeExecutableSchema } from '@graphql-tools/schema'
import { expressMiddleware } from '@apollo/server/express4';

interface options {
  path: string, modulePath: string[]
}

export default function GraphqlServer(options: options): PluginOption {
  return {
    name: 'GraphqlServer',
    apply: 'serve',
    async configureServer(server) {
      const schemas = await (Promise.all(options.modulePath.map(async (path) => {
        const gqlFile = String(fs.readFileSync(`${path}/query.gql`))
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

      const expressServer = Http2(express)
      // const expressServer = express()
      expressServer.use(express.json())
      expressServer.use(expressMiddleware(apolloServer))
      server.middlewares.use(normalizePath(options.path), expressServer)
    }
  }
}