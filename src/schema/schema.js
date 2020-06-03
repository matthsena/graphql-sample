const {
    buildSchema
} = require('graphql')

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