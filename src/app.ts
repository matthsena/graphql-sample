import express from 'express';
import cors from 'cors';
import { GraphQLSchema } from 'graphql';
import graphqlHTTP from 'express-graphql';

const app = express()

app.use(cors())
app.use(express.json())

type serverOptions = {
  path?: string,
  graphiql?: boolean,
  port?: number
}

const server = (schema: GraphQLSchema, resolvers: unknown, serverOptions?: serverOptions) => {
  app.use(serverOptions.path || '/graphql',
    graphqlHTTP({
      schema,
      rootValue: resolvers,
      graphiql: serverOptions.graphiql || true
    })
  )

  app.listen((serverOptions.port || 7000), () => {
    process.stdout.write(`⛵ Sailing GraphQL Sailboat on http://0.0.0.0:${serverOptions.port || 7000}`)
  })
}

export {
  app,
  server
}

