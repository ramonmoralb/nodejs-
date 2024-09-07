import express from 'express'
import { moviesRouter } from './routes/routesMovies.js'
import { middlewareCors } from './middleware/cors.js'

const app = express()
/*
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

        return res.json(req.body)
    })
})
    */
app.use(express.json())
app.disable('x-powered-by')
app.use(middlewareCors)
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server listen on port http://localhost:${PORT}`)
})
