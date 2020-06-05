const {
    buildSchema
} = require('graphql')

const builder = require('./schemaBuilder')

// builder.buildType().then(r => {
//     console.log(r)
// }).catch(e => console.log(e))
// ${builder.buildType().then(r => r)}

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