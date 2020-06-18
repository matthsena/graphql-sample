import express from 'express';
import cors from 'cors';
import GraphQLHTTP from 'express-graphql';
import mongoose from 'mongoose';
import { GraphQLSchema } from 'graphql';
import rootResolver from './resolver/rootResolver';

interface IApp {
  GraphQLServer(schema: GraphQLSchema): void;
  // authentication(): void;
}

class App implements IApp {
    public express: express.Application

    public constructor() {
      this.express = express();
      this.middlewares();
    }

    private middlewares(): void {
      this.express.use(cors());
      this.express.use(express.json());
    }

    // eslint-disable-next-line class-methods-use-this
    private database(): void {
      mongoose.connect('mongodb://HOST:PORT/DB_NAME', {
        useNewUrlParser: true,
      });
    }

    public GraphQLServer(schema: GraphQLSchema): void {
      try {
        this.express.use('/', GraphQLHTTP({
          schema,
          rootValue: rootResolver,
          graphiql: <boolean> <unknown> process.env.GRAPHIQL,
        }));
      } catch (error) {
        throw new Error(error);
      }
    }
}

export default new App();
