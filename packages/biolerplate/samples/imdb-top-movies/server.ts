import app from '@app';
import { Request, Response, NextFunction } from 'express';
import schema from './graphql/schemas/schema';

try {
  // eslint-disable-next-line consistent-return
  app.express.use((req:Request, res:Response, next:NextFunction) => {
    const auth = { login: 'user', password: 'pass' }; // change this

    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (login && password && login === auth.login && password === auth.password) {
      return next();
    }

    res.set('WWW-Authenticate', 'Basic realm="401"');
    res.status(401).send('Authentication required.');
  });

  app.GraphQLServer(schema, '/movies');
  app.express.listen(4000, (err) => {
    if (err) throw new Error(err);
    process.stdout.write('Running on http://0.0.0.0:4000\n');
  });
} catch (error) {
  throw new Error(error);
}
