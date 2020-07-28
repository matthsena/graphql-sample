import express from 'express';
import cors from 'cors';
import GraphQLHTTP from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import resolvers from './graphql/resolvers/rootResolver';

interface IApp {
  GraphQLServer(schema: GraphQLSchema, path?: string): void;
}

class App implements IApp {
    public express: express.Application

    public constructor() {
      this.express = express();
      this.defaultMiddlewares();
    }

    private defaultMiddlewares(): void {
      this.express.use(cors());
      this.express.use(express.json());
    }

    public GraphQLServer(schema: GraphQLSchema, path?: string): void {
      try {
        this.express.use(path || '/', GraphQLHTTP({
          schema,
          rootValue: resolvers,
          graphiql: <boolean> <unknown> process.env.GRAPHIQL || true,
        }));
      } catch (error) {
        throw new Error(error);
      }
    }
}

export default new App();
