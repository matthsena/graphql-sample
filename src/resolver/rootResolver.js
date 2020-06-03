const data = require('../data/movies.json');

module.exports = {
    getMovies: () => {
        return data
    },
    bestMovie: () => {
        return data[0]
    },

    searchMovie: (args) => {
        const {_id} = args
        const movie = data.filter(e => e.id == _id)

        return movie[0];
    }

}
