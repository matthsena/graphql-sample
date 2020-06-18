import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

class App {
    public express: express.Application

    public constructor() {
      this.express = express();
      this.middlewares();
    }

    private middlewares(): void {
      this.express.use(cors());
      this.express.use(express.json());
    }

    static database(): void {
      mongoose.connect('mongodb://HOST:PORT/DB_NAME', {
        useNewUrlParser: true,
      });
    }
}

export default new App().express;
