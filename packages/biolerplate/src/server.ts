import app from '@app';
import schema from './graphql/schemas/schema';

try {
  app.GraphQLServer(schema, '/');
  app.express.listen(4000, (err) => {
    if (err) throw new Error(err);
    process.stdout.write('Running on http://0.0.0.0:4000\n');
  });
} catch (error) {
  throw new Error(error);
}
