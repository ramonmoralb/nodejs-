/* eslint-disable space-before-function-paren */
import { Router } from 'express'
// createRequire crea un requiere para poder usar el json sin necesidad de parsearlo
// import { createRequire } from 'node:module'

import { validateMovie, validatePartialMovie } from '../schemes/schemaValiMovie.js'
import { moviesModel } from '../models/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', async (req, res) => {
    const { genre } = req.query
    const movies = await moviesModel.getAll({ genre })
    return res.json(movies)
})

moviesRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const movie = await moviesModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'resource not found' })
})

moviesRouter.post('/', async (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
        return res.status(400).json({ error: result.error })
    }

    const newMovie = await moviesModel.create({ imput: result.data })
    res.status(201).json(newMovie)
})
/*
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
*/
moviesRouter.delete('/:id', async (req, res) => {
    const { id } = req.params
    const result = await moviesModel.delete({ id })

    if (result === false) { return res.status(404).json({ message: 'not found' }) }
    return res.status(200).json({ message: 'deleted' })
})
