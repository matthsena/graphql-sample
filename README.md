# GraphQL Sailboat :sailboat:

GraphQL Sailboat is a simple and efficient Node.js GraphQL HTTP Server, built with TypeScript and Express. Our goal is to increase productivity in the development of amazing GraphQL APIs. **Just take your sailboat and sail!**


## Installation
```sh
yarn add graphql-sailboat
```

## Basic Usage
```js
const { server } = require('graphql-sailboat')

const schema = `[Your Schema]`
const resolvers = { 
    // Your Resolvers
 }

 server(schema, resolvers, {
     path: '/sample', // optional, '/graphql' by default
     graphiql: false, // optional, true by default
     port: 8080 // optional, 7000 by default
 })

```
## Sample with values

```js
const { server } = require('graphql-sailboat')

const data = [{
  id: 1,
  tile: "The Shawshank Redemption",
  year: 1994,
  duration: 142,
  genre: "Drama",
  imdbRate: 9.3,
  director: "Frank Darabont"
}, {
  id: 2,
  title: "The Godfather",
  year: 1972,
  duration: 175,
  genre: "Drama, Crime",
  imdbRate: 9.2,
  director: "Francis Ford Coppola"
}, {
  id: 3,
  title: "The Dark Knight",
  year: 2008,
  duration: 152,
  genre: "Action, Crime, Drama",
  imdbRate: 9.0
}];

const schema = `
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
`;

const resolvers = {
  getMovies: () => data,
  bestMovie: () => {
    let theBest;
    let rate;
    data.map(e => {
      if (!rate) {
        rate = e.imdbRate;
        theBest = e;
      } else if (e.imdbRate > rate) {
        rate = e.imdbRate;
        theBest = e;
      }
    });
    return theBest;
  },
  searchMovie: args => {
    const id = args;
    const movie = data.filter(e => e.id === id);
    return movie[0];
  }
};

server(schema, resolvers, {
  port: 8000
});
```

## Express middlewares

You can acess express object and create custom middlewares importing `app`, like this:

```js
const { server, app } = require('graphql-sailboat')
// example of basic auth middleware
app.use((req, res, next) => {

    const auth = { login: 'user', password: 'pass' };
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (login && password && login === auth.login && password === auth.password) {
      return next();
    }

    res.set('WWW-Authenticate', 'Basic realm="401"');
    return res.status(401).send('Authentication required.');
})
// ...
// ...
// ...
server(schema, resolvers, {
  port: 8000
});
```