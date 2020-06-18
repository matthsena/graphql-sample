import app from './app';
import { schema } from './schema/schema';

try {
  app.GraphQLServer(schema);
  app.express.listen(4000, () => {
    console.log('running');
    console.log(process.env.GRAPHIQL);
  });
} catch (error) {
  throw new Error(error);
}
