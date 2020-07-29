/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import express from 'express';
import cors from 'cors';
import GraphQLHTTP from 'express-graphql';
import { GraphQLSchema, buildSchema } from 'graphql';

interface IApp {
  GraphQLServer(schema: string, resolvers: unknown, server: serverOptions): void;
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

    private graphqlSchema(schema: string): GraphQLSchema {
      try {
        if (!schema) {
          throw new Error('Empty schema');
        }

        return buildSchema(schema);
      } catch (error) {
        throw new Error(error);
      }
    }

    public GraphQLServer(schema: string, resolvers: unknown, server: serverOptions): void {
      try {
        this.express.use(server.path || '/', GraphQLHTTP({
          schema: this.graphqlSchema(schema),
          rootValue: resolvers,
          graphiql: server.graphiql || false,
        }));
      } catch (error) {
        throw new Error(error);
      }
    }
}

export const app = new App();
