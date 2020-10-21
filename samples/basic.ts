import server from '../src/app';

const data = [{
  id: 1,
  tile: 'The Shawshank Redemption',
  year: 1994,
  duration: 142,
  genre: 'Drama',
  imdbRate: 9.3,
  director: 'Frank Darabont',
}, {
  id: 2,
  title: 'The Godfather',
  year: 1972,
  duration: 175,
  genre: 'Drama, Crime',
  imdbRate: 9.2,
  director: 'Francis Ford Coppola',
}, {
  id: 3,
  title: 'The Dark Knight',
  year: 2008,
  duration: 152,
  genre: 'Action, Crime, Drama',
  imdbRate: 9.0,
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
    data.map((e) => {
      if (!rate) {
        rate = e.imdbRate;
        theBest = e;
      } else if (e.imdbRate > rate) {
        rate = e.imdbRate;
        theBest = e;
      }

      return null;
    });
    return theBest;
  },
  searchMovie: (args) => {
    const id = args;
    const movie = data.filter((e) => e.id === id);
    return movie[0];
  },
};

server(schema, resolvers, {
  port: 8000,
});
