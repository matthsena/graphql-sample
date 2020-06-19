import { buildSchema, GraphQLSchema } from 'graphql';

const schema: GraphQLSchema = buildSchema(`
type Movie { 
    id: ID!, 
    title: String!, 
    year: Int!, 
    duration: Int!, 
    genre: String!, 
    imdbRate: Float!, 
    director: String 
} 

type Query { 
    getMovies: [Movie], 
    bestMovie: Movie, 
    searchMovie(_id: ID): Movie 
}
`);

export default schema;
