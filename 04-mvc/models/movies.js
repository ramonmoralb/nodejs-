/* eslint-disable space-before-function-paren */

import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const movies = require('../movies/movies.json')

export class moviesModel {
    static async getAll({ genre }) {
        if (genre) {
            return movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
        }
        return movies
    }

    static async getById({ id }) {
        const movie = movies.find(movie => movie.id === id)
        return movie
    }

    static async create({ input }) {
        const newMovie = {
            id: crypto.randomUUID(),
            ...input
        }
        movies.push(newMovie)
    }

    static async delete({ id }) {
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex === -1) { return false } else {
            movies.splice(movieIndex, 1)
            return true
        }
    }
}
