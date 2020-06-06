const {
    buildSchema
} = require('graphql')

const { schemaBuilder } = require('./schemaBuilder')

schemaBuilder().then(r => console.log(r))

const schema = buildSchema(`
    # Types
    type Movie {
        id: ID!
        title: String!
        year: Int!
        duration: Int!
        genre: String!
        imdbRate: Float!
        director: String
        }

    # Queries
    type Query {
        getMovies: [Movie]
        bestMovie: Movie
        searchMovie(_id: ID): Movie
    }
`)

exports.schema = schema;