/* eslint-disable import/no-unresolved */
import { buildSchema, GraphQLSchema } from 'graphql';
import merge from '@graphql-sailboat/mergeSchema';

const source: string = merge.MergeSchemas(__dirname);

const schema: GraphQLSchema = buildSchema(source);

export default schema;
