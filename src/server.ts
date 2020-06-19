/* eslint-disable no-console */
import app from './app';
import { schema } from './schema/schema';
// import rootResolver from './resolver/rootResolver';
// import resolvers from './graphql/resolver/rootResolver';

try {
  app.GraphQLServer(schema, '/teste');
  app.express.listen(4000, () => {
    console.log('running');
    console.log(process.env.GRAPHIQL);
  });
} catch (error) {
  throw new Error(error);
}
