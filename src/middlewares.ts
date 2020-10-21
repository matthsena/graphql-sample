import app from './express';
import { SailMiddleware } from '../graphql-sailboat';

const setMiddleware = (middleware: SailMiddleware): void => {
  try {
    if (!middleware) {
      throw new Error('Empty middlewares');
    }

    app.use(middleware());
  } catch (e) {
    process.stdout.write(`Error: ${e}\n`);
  }
};

const setManyMiddlewares = (middlewares: Array<SailMiddleware>): void => {
  try {
    if (!middlewares) {
      throw new Error('Empty middlewares');
    }

    middlewares.map((middleware: () => never): object => app.use(middleware()));
  } catch (e) {
    process.stdout.write(`Error: ${e}\n`);
  }
};

export {
  setMiddleware,
  setManyMiddlewares,
};
