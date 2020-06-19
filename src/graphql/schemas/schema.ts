import { buildSchema, GraphQLSchema } from 'graphql';
import * as fs from 'fs';

const source: string = fs.readFileSync(`${__dirname}/myschema.gql`, 'utf-8');

const schema: GraphQLSchema = buildSchema(source);

export default schema;
