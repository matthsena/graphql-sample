import { buildSchema, GraphQLSchema } from 'graphql';
import merge from '../../functions/merge';

const source: string = merge.MergeSchemas(__dirname);

const schema: GraphQLSchema = buildSchema(source);

export default schema;
