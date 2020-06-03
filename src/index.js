const express = require('express')
const graphqlHTTP = require('express-graphql')
const {
    schema
} = require('./schema/schema')
const rootResolver = require('./resolver/rootResolver')

const app = express()

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: rootResolver,
    graphiql: true
}))
app.listen(4000, () => console.log('http://localhost:4000/graphql'))