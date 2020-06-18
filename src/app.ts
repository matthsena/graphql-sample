import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

class App {
    public express: express.Application

    public constructor() {
      this.express = express();
      this.middlewares();
      this.routes();
    }

    private middlewares(): void {
      this.express.use(express.json());
      this.express.use(cors());
    }

    static database(): void {
      mongoose.connect('mongodb://HOST:PORT/DB_NAME', {
        useNewUrlParser: true,
      });
    }

    private routes(): void {
      this.express.get('/', (req, res) => res.send('hello world'));
    }
}

export default new App().express;
