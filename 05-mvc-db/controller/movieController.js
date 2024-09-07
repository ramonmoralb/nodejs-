// import { moviesModel } from '../models/local-file/movies.js'
import { moviesModel } from '../models/my-sql/movies.js'
import { validateMovie, validatePartialMovie } from '../schemes/schemaValiMovie.js'

export class movieController {
    static async getAll(req, res) {
        const { genre } = req.query
        const movies = await moviesModel.getAll({ genre })
        if (movies && movies.length > 0) {
            return res.json(movies)
        }

        return res.status(404).json({ error: 'Not found' })
    }

    static async getById(req, res) {
        const { id } = req.params
        const movie = await moviesModel.getById({ id })
        if (movie) return res.json(movie)
        res.status(404).json({ message: 'resource not found' })
    }

    static async create(req, res) {
        const result = validateMovie(req.body)

        if (result.error) {
            return res.status(400).json({ error: result.error })
        }

        const newMovie = await moviesModel.create({ input: result.data })
        res.status(201).json(newMovie)
    }

    static async update(req, res) {
        const result = validatePartialMovie(req.body)
        if (result.error) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const { id } = req.params
        const updateMovie = await moviesModel.update({ id, input: result.data })
        return res.json(updateMovie)
    }

    static async delete(req, res) {
        const { id } = req.params
        const result = await moviesModel.delete({ id })

        if (result === false) { return res.status(404).json({ message: 'not found' }) }
        return res.status(200).json({ message: 'deleted' })
    }
}
