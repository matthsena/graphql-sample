import express from 'express';
import cors from 'cors';
import GraphQLHTTP from 'express-graphql';
import mongoose from 'mongoose';
import { GraphQLSchema } from 'graphql';
import resolvers from './graphql/resolvers/rootResolver';

interface IApp {
  GraphQLServer(schema: GraphQLSchema, path?: string): void;
}

type Movies = {
  id?: number,
  title?: string,
  year?: number,
  duration?: number,
  genre?: string,
  imdbRate?: number,
  director?: string
}

interface IResolvers {
  getMovies(): Array<Movies>,
  bestMovies(): Movies,
  searchMovie(_id: number): Movies
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

    public GraphQLServer(schema: GraphQLSchema, path?: string): void {
      try {
        this.express.use(path || '/', GraphQLHTTP({
          schema,
          rootValue: resolvers,
          graphiql: <boolean> <unknown> process.env.GRAPHIQL,
        }));
      } catch (error) {
        throw new Error(error);
      }
    }
}

export default new App();
