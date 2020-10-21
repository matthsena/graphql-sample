import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql'

const app = express()

app.use(cors())
app.use(express.json())

type serverOptions = {
  path?: string,
  graphiql?: boolean,
  port?: number
}

const setMiddlewares = (middlewares: Array<object>): void => {
  try {
    if (!middlewares) {
      throw new Error("Empty middlewares")
    }
  } catch {
    
  }
}

const server = (schema: string, resolvers: unknown, serverOptions?: serverOptions) => {

  app.use(serverOptions.path || '/graphql',
    graphqlHTTP({
      schema: buildSchema(schema),
      rootValue: resolvers,
      graphiql: serverOptions.graphiql || true
    })
  )

  app.listen((serverOptions.port || 7000), () => {
    process.stdout.write(
      `⛵ Sailing GraphQL Sailboat on http://0.0.0.0:${serverOptions.port || 7000}${serverOptions.path || '/graphql'}\n`
    )
  })
}

export {
  app,
  server
}

