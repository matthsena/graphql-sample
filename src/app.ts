import { Client } from '../graphql-sailboat';
import { setManyMiddlewares, setMiddleware } from './middlewares';
import { server } from './server';

const client: Client = {
  graphql: server,
  manyMiddlewares: setManyMiddlewares,
  middleware: setMiddleware,
};

export default client as Client;
