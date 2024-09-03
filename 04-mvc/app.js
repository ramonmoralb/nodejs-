import express from 'express'
import { moviesRouter } from './routes/routesMovies.js'
import { middlewareCors } from './middleware/cors.js'

const app = express()
app.use(express.json())
app.disable('x-powered-by')
app.use(middlewareCors)
app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server listen on port http://localhost:${PORT}`)
})
