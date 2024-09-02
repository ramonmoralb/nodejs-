import { Router } from 'express'
// createRequire crea un requiere para poder usar el json sin necesidad de parsearlo
import { createRequire } from 'node:module'
import { randomUUID } from 'node:crypto'
import { validateMovie, validatePartialMovie } from '../schemes/schemaValiMovie.js'

const require = createRequire(import.meta.url)
const movies = require('../movies/movies.json')
export const moviesRouter = Router()

moviesRouter.get('/', (req, res) => {
    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter((movie) => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
        return res.json(filteredMovies)
    }
    return res.json(movies)
})

moviesRouter.get('/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find((movie) => movie.id === id)
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'resource not found' })
})

moviesRouter.post('/', (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
        return res.status(400).json({ error: result.error })
    }

    const newMovie = {
        id: randomUUID(),

        ...result.data

    }

    movies.push(newMovie)
    res.status(201).json(newMovie)
})

moviesRouter.patch('/:id', (req, res) => {
    const { id } = req.params
    const result = validatePartialMovie(req.body)
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return res.status(404).json({ message: 'Movie Not Found' })
    if (result.error) {
        return res.status(422).json({ error: result.error })
    }
    const updateMovie = { ...movies[movieIndex], ...result.data }
    movies[movieIndex] = updateMovie
    return res.status(201).json(updateMovie)
})

moviesRouter.delete('/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Not Found' })
    }

    movies.splice(movieIndex, 1)

    return res.status(200).json({ message: 'Deleted movie' })
})
