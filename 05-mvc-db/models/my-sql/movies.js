import mysql from 'mysql2/promise'
// import { movieController } from '../../controller/movieController.js'
const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'movies-db'
}

const connection = await mysql.createConnection(config)

export class moviesModel {
    static async getAll({ genre }) {
        if (genre) {
            const lowerGenre = genre

            // recuperos los géneros
            const [genreRows] = await connection.query(
                'SELECT id FROM genre WHERE LOWER(name)= ?', [lowerGenre]
            )
            // si no hay género concordante
            if (genreRows.length === 0) { return [] }

            // si hay género almaceno el id
            const { id } = genreRows[0]

            // uso el id para recuperar el id del movie
            const [moviesIdRow] = await connection.query(
                'SELECT movie_id FROM movie_genres where genre_id = ?', [id]
            )

            // compruebo que hay resultados
            if (moviesIdRow.length === 0) { return [] }

            const moviesIds = moviesIdRow.map(row => row.movie_id)

            const [movies] = await connection.query(
                'SELECT title, yeara, director, duration, poster , rate , id  from movie where id in (?);', [moviesIds]
            )

            const formatedMovies = movies.map(movie => {
                return {
                    ...movie
                }
            })

            console.log(formatedMovies)

            return formatedMovies
        }

        // sin genre
        const [movies] = await connection.query(

            'SELECT title, yeara, director, duration, poster , rate , id  from movie;'
        )

        const formatedMovies = movies.map(movie => {
            return {
                ...movie
            }
        })

        console.log(formatedMovies)

        return formatedMovies
    }

    static async getById({ id }) {
        const [movies] = await connection.query(
            'SELECT title, yeara, director, duration, poster , rate , id  from movie where id = ? ;', [id]
        )
        return movies[0]
    }

    static async create({ input }) {
        const { title, year, director, duration, poster, rate } = input
        const [uuidResult] = await connection.query(
            `SELECT generate_movie_id("${title}", ${year} ) AS uuid;`
        )
        const [{ uuid }] = uuidResult

        await connection.query(
            'INSERT INTO movie (id, title, yeara, director, duration, poster, rate) VALUES (? ,?,?,?,?,?,? )', [uuid, title, year, director, duration, poster, rate]
        )
        const [movies] = await connection.query(
            'SELECT title, yeara, director, duration, poster , rate , id  from movie where id = ? ;', [uuid]
        )
        return movies[0]
    }

    static async delete({ id }) {
        try {
            const [movies] = await connection.query(
                'SELECT * FROM movie where id = ?', [id]
            )
            const movie = movies[0]

            if (!movie) return false
            await connection.query(
                'DELETE  from movie WHERE id = ?', [id]
            )
            return movie
        } catch (error) {
            console.log(error.message)
            return false
        }
    }

    static async update({ id, input }) {
        try {
            // valores dinámicos, si faltan campos no peta
            const fields = []
            const values = []

            // añadimos los campos que se modifican y los valores a los arrays
            if (input.title) {
                fields.push('title = ?')
                values.push(input.title)
            }
            if (input.year) {
                fields.push('yeara = ?')
                values.push(input.year)
            }
            if (input.director) {
                fields.push('director = ?')
                values.push(input.director)
            }
            if (input.duration) {
                fields.push('duration = ?')
                values.push(input.duration)
            }
            if (input.poster) {
                fields.push('poster = ?')
                values.push(input.poster)
            }
            if (input.rate) {
                fields.push('rate = ?')
                values.push(input.rate)
            }

            values.push(id)

            // Construimos la consulta SQL
            const query = `UPDATE movie SET ${fields.join(', ')} WHERE id = ?`

            // recibe la consulta en un string y los valores en un array
            await connection.query(query, values)

            const [movies] = await connection.query(
                'SELECT * FROM movie WHERE id = ?', [id]
            )

            const movie = movies[0]
            return movie
        } catch (error) {
            console.log(error.message) // esto no se debe hacer, el user podría ver el error
        }
    }
}
