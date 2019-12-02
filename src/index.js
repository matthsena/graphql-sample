const express = require('express')
const graphqlHTTP = require('express-graphql')

const schema = require('./schema')

const app = express()
const PORT = 3500

app.use((req, res, next) => {


    const auth = {
        login: 'yourlogin',
        password: 'yourpassword'
    }

    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = new Buffer(b64auth, 'base64').toString().split(':')

    if (login && password && login === auth.login && password === auth.password) {
        return next()
    }

    
    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send('Authentication required.')
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))


app.listen(PORT, () => {
    console.log(`rodando em ${PORT}`)
})