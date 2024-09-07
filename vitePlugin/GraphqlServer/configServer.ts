import { Connect, ViteDevServer } from 'vite';
// import { createHandler } from 'graphql-http/lib/use/http'
import { IResolvers } from '@graphql-tools/utils';
import { mergeSchemas, makeExecutableSchema } from '@graphql-tools/schema'
import fs from 'fs'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServer } from '@apollo/server';
import express, { json } from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import http from 'http'
import { GraphQLSchema } from 'graphql';

export function normalizeURLPath(path: string) {
  return path.startsWith('/') ? path : `/${path}`
}

async function createApolloServer(vite: ViteDevServer, schemas: GraphQLSchema[]) {
  // const app = Http2(express)
  const app = express()
  const apolloServer = new ApolloServer({
    schema: mergeSchemas({
      schemas: schemas
    }),
    // @ts-ignore
    plugins: vite.httpServer ? [ApolloServerPluginDrainHttpServer({ httpServer: vite.httpServer })] : []
  })
  await apolloServer.start()
  app.use(json())
  app.use(expressMiddleware(apolloServer))
  const server = http.createServer(app).listen(9942)
  return {
    app: app, closer: (callBack: () => void) => {
      server.close(() => {
        setImmediate(function () { server.emit('close') });
        callBack()
      })
    }
  }
}
const obj = { app: (req, res, next) => next(), closer: undefined } as { app: Connect.NextHandleFunction, closer: ((callBack: () => void) => void) | undefined }


export default async function init(server: ViteDevServer, _path: string = '/graphql', modulePath: string[]) {

  // TODO: create schema files from modulePath
  const schemas = await Promise.all(modulePath.map(async (path) => {
    const gqlFile = String(fs.readFileSync(`${path}/query.gql`))
    const resolverPath = `${path}/resolvers.ts`
    await server.transformRequest(resolverPath)
    const resolver = (await server.ssrLoadModule(resolverPath)).default()
    const schema = makeExecutableSchema({
      typeDefs: gqlFile,
      resolvers: resolver as IResolvers<any, any>
    })
    return schema
  }))

  // const tempPath = normalizeURLPath(path)
  async function startServer() {
    const temp = await createApolloServer(server, schemas);
    obj.app = temp.app
    obj.closer = temp.closer
  }

  if (obj.closer) {
    await obj.closer(startServer)
  } else {
    startServer()
  }
  server.watcher.on('all', async (eventName) => {
    if (eventName === 'add' || eventName === 'change') {
      if (obj.closer) {
        await obj.closer(startServer)
      } else {
        startServer()
      }
    }
  });
}