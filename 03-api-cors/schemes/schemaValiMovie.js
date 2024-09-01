// eesquema de validaciones

const z = require('zod') // validaciones de datos

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is requires'
    }),
    year: z.number().int().min(1900).max(2024),
    director: z.string({
        invalid_type_error: 'Director must be a string'
    }),
    duration: z.number().int().positive().max(300),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }),
    rate: z.number().min(0).max(10).default(5),
    genre: z.array(z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']))

})

function validateMovie(object) {
    return movieSchema.safeParse(object)
    // safeParse devuelve un object result err o data
}

// validación parcial de datos

function validatePartialMovie(object) {
    // partial() muy usado en typeScript hace que las props sean opcionales
    return movieSchema.partial().safeParse(object)
}

module.exports = {
    validateMovie,
    validatePartialMovie
}
