import app from './app';
import schema from './graphql/schemas/schema';

try {
  app.GraphQLServer(schema, '/teste');
  app.express.listen(4000, (err) => {
    if (err) throw new Error(err);
    process.stdout.write('Running on http://localhost:4000\n');
  });
} catch (error) {
  throw new Error(error);
}
