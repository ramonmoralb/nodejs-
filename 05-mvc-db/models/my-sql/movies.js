import mysql from 'mysql2/promise'
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
            console.log(moviesIds.toString('hex').match(/.{1,8}/g).join('-xdz'))
            const [movies] = await connection.query(
                'SELECT title, yeara, director, duration, poster , rate ,(UNHEX(REPLACE(UUID(), "-", ""))) id  from movie where id in (?);', [moviesIds]
            )

            const formatedMovies = movies.map(movie => {
                return {
                    ...movie,
                    id: movie.id
                        .toString('hex') // Convertimos el Buffer a string hexadecimal
                        .match(/.{1,8}/g) // Dividimos el string en grupos de 8 caracteres
                        .join('-') // Agregamos los guiones en el formato UUID
                }
            })

            console.log(formatedMovies)

            return formatedMovies
        }

        // sin genre
        const [movies] = await connection.query(
            'SELECT title, yeara, director, duration, poster , rate ,(UNHEX(REPLACE(UUID(), "-", ""))) id  from movie;'
        )

        const formatedMovies = movies.map(movie => {
            return {
                ...movie,
                id: movie.id
                    .toString('hex') // Convertimos el Buffer a string hexadecimal
                    .match(/.{1,8}/g) // Dividimos el string en grupos de 8 caracteres
                    .join('-') // Agregamos los guiones en el formato UUID
            }
        })

        console.log(formatedMovies)

        return formatedMovies
    }

    static async getById({ id }) {

    }

    static async create({ input }) {

    }

    static async delete({ id }) {

    }
}
