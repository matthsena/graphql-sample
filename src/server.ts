import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import cors from 'cors';
import { SailServerOptions } from '../graphql-sailboat';
import { setManyMiddlewares } from './middlewares';

import express, { app } from './express';

const server = (schema: string, resolvers: unknown, serverOptions?: SailServerOptions) => {
  setManyMiddlewares([
    () => cors(),
    () => express.json(),
  ]);

  app.use(serverOptions.path || '/graphql',
    graphqlHTTP({
      schema: buildSchema(schema),
      rootValue: resolvers,
      graphiql: serverOptions.graphiql || true,
    }));

  app.listen((serverOptions.port || 7000), () => {
    process.stdout.write(
      `⛵ Sailing GraphQL Sailboat on http://0.0.0.0:${serverOptions.port || 7000}${serverOptions.path || '/graphql'}\n`,
    );
  });
};

export default server;
