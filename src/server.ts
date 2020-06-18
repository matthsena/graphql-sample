import GraphQLHTTP from 'express-graphql';
import app from './app';
import rootResolver from './resolver/rootResolver';
import { schema } from './schema/schema';

try {
  app.use('/', GraphQLHTTP({
    schema,
    rootValue: rootResolver,
    graphiql: true,
  }));
} catch (error) {
  throw new Error(error);
}
app.listen(3000);
