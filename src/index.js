const express = require('express')
const graphqlHTTP = require('express-graphql')
const {
    schema
} = require('./schema/schema')
const rootResolver = require('./resolver/rootResolver')
const cors = require('cors')

// Basic auth
const loggingMiddleware = (req, res, next) => {

    const auth = {
        login:'yourlogin',
        password: 'yourpassword'
    } 
    
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    if (login && password && login === auth.login && password === auth.password) {
        return next()
    }
    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send('Authentication required.')
}

const app = express()
app.use(cors())
app.use(loggingMiddleware);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: rootResolver,
    graphiql: true
}))
app.listen(4000, () => console.log('http://localhost:4000/graphql'))