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
  bestMovie: (): Movies => data[0],

  searchMovie: (args: number): Movies => {
    const id = args;
    const movie = data.filter((e) => e.id === id);

    return movie[0];
  },

};

export default resolvers;
