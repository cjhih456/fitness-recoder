import type { Plugin } from 'vite';
import fs from 'fs'
import { resolve } from 'path'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { mergeSchemas, makeExecutableSchema } from '@graphql-tools/schema'
import express from 'express'
import Http2 from 'http2-express-bridge'
import { normalizePath } from 'vite';

export interface options {
  path: string,
  modulePath: string[]
  autoGenTypePath?: string
}

interface AutogenType {
  __schema: {
    types: {
      kind: string
      name: string
      possibleTypes: {
        name: string
      }[]
    }[]
  }
}
const autogenType = `{
  __schema {
    types {
      kind
      name
      possibleTypes {
        name
      }
    }
  }
}`

export default async function GraphqlServer(options: options): Promise<Plugin[]> {

  const schemas = await Promise.all(options.modulePath.map(async (path) => {
    const gqlFile = String(fs.readFileSync(resolve(path)))
    const schema = makeExecutableSchema({
      typeDefs: gqlFile,
    })
    return schema
  }))

  const apolloServer = new ApolloServer({
    schema: mergeSchemas({
      schemas: schemas
    })
  })
  await apolloServer.start()
  return [{
    name: 'GraphqlServer',
    apply: 'serve',
    async configureServer(server) {
      const expressServer = server.config.server.https ? Http2(express) : express()
      expressServer.use(express.json())
      expressServer.use(expressMiddleware(apolloServer))
      server.middlewares.use(normalizePath(options.path), expressServer)
    }
  }, {
    name: 'GraphqlAutoGen',
    enforce: 'pre',
    async buildStart() {
      if (options.autoGenTypePath) {
        const types = await apolloServer.executeOperation<AutogenType>({
          variables: {},
          query: autogenType
        }).then((result) => {
          const possibleTypes: { [k: string]: string[] } = {}
          if (result.body.kind === 'single') {
            result.body.singleResult.data?.__schema.types.forEach(supertype => {
              if (supertype.possibleTypes) {
                possibleTypes[supertype.name] =
                  supertype.possibleTypes.map(subtype => subtype.name);
              }
            })
          }
          return possibleTypes
        })
        fs.writeFileSync(options.autoGenTypePath, JSON.stringify(types))
        const watchingFiles = this.getWatchFiles()
        if (!watchingFiles.includes(options.autoGenTypePath)) {
          this.addWatchFile(options.autoGenTypePath)
        }
      }
    }
  }]
}