/* eslint-disable array-callback-return */
import data from '../../data/movies.json';

type Movies = {
    id?: number,
    title?: string,
    year?: number,
    duration?: number,
    genre?: string,
    imdbRate?: number,
    director?: string
}

interface IResolvers {
    getMovies(): Array<Movies>,
    bestMovie(): Movies,
    searchMovie(_id: number): Movies
}

const resolvers: IResolvers = {
  getMovies: (): Array<Movies> => data,
  bestMovie: (): Movies => {
    let theBest:Movies;
    let rate:number;

    data.map((e) => {
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

  searchMovie: (args: number): Movies => {
    const id = args;
    const movie = data.filter((e) => e.id === id);

    return movie[0];
  },

};

export default resolvers;
