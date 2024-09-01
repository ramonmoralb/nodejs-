import express, { json } from 'express'
import fs from 'fs'

// import movies from './movies/movies.json' with {type: 'json'}
import { randomUUID } from 'node:crypto'
import { validateMovie, validatePartialMovie } from './schemes/schemaValiMovie.js'

const movies = JSON.parse(fs.readFileSync('./movies/movies.json', 'utf-8'))

// const cors = require('cors') // esto es peligroso pone asterisco permitiendo todas las entradas

const app = express()
// app.use(cors()) // esto es peligroso pone asterisco permitiendo todas las entradas

app.disable('x-powered-by')

const ACCESS_ORIGIN_ACCEPTED = [
    'http://localhost:8080',
    'http://localhost:1234',
    'https://movies.com'

]

app.get('/movies', (req, res) => {
    /* CORS: Cross-Origin Resource Sharing
    * (Compartición de Recursos de Origen Cruzado),
    * es una política de seguridad implementada por
    * los navegadores web para controlar cómo se pueden
    * solicitar recursos desde una página web a un dominio
    * diferente del dominio original desde donde se cargó la página.
    * Métodos normales : GET / HEAD / POST
    *
    * Métodos complejos: PUT / DELETE / PATH -> croos pre.flight
    * Solicitud preparatoria OPTIONS -> ejemplo en  app.options()
    *  ///app.options(res.header(Access-Control-Allow-Origin', '*')) ESTO HACE EL MÓDULO DE CORS///
    * Además
    *
    * HEADERS:
    * Access-Control-Allow-Origin: Este encabezado es enviado por el
    * servidor destino para indicar qué dominios pueden acceder a losrecursos.
    * Access-Control-Allow-Origin: * permite el acceso desde cualquier dominio, mientras que
    * Access-Control-Allow-Origin: https://ejemplo.com permite solo un dominio específico.
    */
    // const ACCESS_ORIGIN_ACCEPTED = 'http://localhost:8080'
    //  res.header('Access-Control-Allow-Origin', '*') --> permite el acceso a todos los origenes, de esta forma lo hace cuando importamos el módulo de cors

    // recupero el origin
    const origin = req.header('origin')
    if (ACCESS_ORIGIN_ACCEPTED.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
    }

    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter((movie) => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
        return res.json(filteredMovies)
    }
    return res.json(movies)
})
app.get('/movies/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find((movie) => movie.id === id)
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'resource not found' })
})

/*
// funcionamiento de  middleware; use() se ejecuta siempre
app.use((req, res, next) => {
    let body = ''
    // comprueba el método si es post next
    if (req.method !== 'POST') return next()
    // comprueba que es un json
    if (req.headers['content-type'] !== 'application/json') return next()

    // node responde a eventos entonces recibe la info mediante buffers y en trozos  mediante data
    req.on('data', (chunk) => {
        body += chunk.toString()
    })
    // final del evento y almacenaje de la data en el body
    req.on('end', () => {
        const data = JSON.parse(body)
        req.body = data
        next()
    })
})
    */

// express ya cuenta con este middleware nativo para recuperar el req.body
app.use(json())

// no se debe cambiar la url, los recursos son los
// mismos, cambian los verbos
app.post('/movies', (req, res) => {
    /**
     * el result sera igual al req.body validado
     * devuelve el objeto con result data o error
     * compruebo en un if y si es success parseo a json
     * si es err devuelvo el error
     */
    const result = validateMovie(req.body)

    if (result.error) {
        return res.status(400).json({ error: result.error })
    }

    const newMovie = {
        id: randomUUID(),
        /* ... spread operator:  extrae y copia todas las propiedades validadas de 'result.data'
        al nuevo objeto 'newMovie'.
        * evitando : title: result.data.title etc..
        */
        ...result.data

    }

    /**
     * Sin validar datos
     * const {
            title,
            genre,
            duration,
            director,
            poster,
            rate
        } = req.body

        // creo un nuevo objeto
        const newMovie = {
            id: crypto.randomUUID(),
            title,
            genre,
            duration,
            director,
            poster,
            rate: rate ?? 0
        }

        */
    movies.push(newMovie)
    res.status(201).json(newMovie)
})

// modificar película  PATCh
app.patch('/movies/:id', (req, res) => {
    // recuerar id
    const { id } = req.params
    // result almacena lo el body del request, (lo que pasa el user)
    const result = validatePartialMovie(req.body)
    // con la id busco la pelicula
    const movieIndex = movies.findIndex(movie => movie.id === id)
    // si no hay id de la pelicula
    if (movieIndex === -1) return res.status(404).json({ message: 'Movie Not Found' })
    // si hay error
    if (result.error) {
        return res.status(422).json({ error: result.error })
    }

    const updateMovie = { ...movies[movieIndex], ...result.data }
    movies[movieIndex] = updateMovie
    return res.status(201).json(updateMovie)
})

// borrar película al usar el método delete la presolicitud options hay que gerstionar el cors

app.options('/movies/:id', (req, res) => {
    const origin = req.header('origin')
    if (ACCESS_ORIGIN_ACCEPTED.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
        // además es necesario al options indicarle los metodos permitido
        res.header('Access-Control-Allow-Methods', 'GET, DELETE, POST, PUT, PATCH')
    }
    res.send(200)
})

app.delete('/movies/:id', (req, res) => {
    const origin = req.header('origin')
    if (ACCESS_ORIGIN_ACCEPTED.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
    }
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Not Found' })
    }

    // splice borra del array desde el indice inicial 1º param los items indicadado en el 2ºparam
    movies.splice(movieIndex, 1)

    return res.status(200).json({ message: 'Deleted movie' })
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server listen on port http://localhost:${PORT}`)
})
