import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import app from './express';
import { SailServerOptions } from '../graphql-sailboat';

const server = (schema: string, resolvers: unknown, serverOptions?: SailServerOptions) => {
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

export {
  app,
  server,
};
