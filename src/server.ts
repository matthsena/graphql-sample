import app from './app';
import schema from './graphql/schemas/schema';

try {
  app.GraphQLServer(schema, '/teste');
  app.express.listen(4000);
} catch (error) {
  throw new Error(error);
}
