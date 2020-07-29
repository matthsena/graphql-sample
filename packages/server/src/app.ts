import express from 'express';
import cors from 'cors';
import GraphQLHTTP from 'express-graphql';
import { GraphQLSchema, buildSchema } from 'graphql';

interface IApp {
  GraphQLServer(schema: GraphQLSchema, resolvers: unknown, server: serverOptions): void;
}

type serverOptions = {
  path?: string,
  graphiql?: boolean
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

    public GraphQLServer(schema: GraphQLSchema, resolvers: unknown, server: serverOptions): void {
      try {
        this.express.use(server.path || '/', GraphQLHTTP({
          schema,
          rootValue: resolvers,
          graphiql: server.graphiql || false,
        }));
      } catch (error) {
        throw new Error(error);
      }
    }
}

export default new App();
