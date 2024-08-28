/* eslint-disable indent */
const ditto = require('./pokemon/ditto.js')
const express = require('express')
const app = express()

const PORT = process.env.PORT ?? 1234

app.get('/', (req, res) => {
    res.send('<h1>Mi página</h1>')
})
app.get('/json', (req, res) => {
    res.json({ message: 'hola' })
})

// middleware usuario loggeadon comprobación database ...
app.use(/* '/createpoke/',//sin este parametro afecta a todas las rutas
    que hecen match */(req, res, next) => { // acepta tercer parametro de este modo se pueden hacer cosas antes del response
        console.log('first middleware')
        next() // necesarion si no entra en un waiting infinito
    })

// middleware, almacena el req.body ejemplo de uso en /createpoke

app.use((req, res, next) => {
    if (req.method !== 'POST') return next()
    if (req.headers['content-type'] !== 'application/json') return next()
    let body = ''
    req.on('data', (chunk) => {
        body += chunk.toString()
    })

    req.on('end', () => {
        const data = JSON.parse(body)
        data.timeStamp = Date.now().toString()
        req.body = data
        next()
    })
})

app.get('/pokemon', (req, res) => {
    res.status(200).json(ditto)
})

app.post('/createpoke', (req, res) => {
    // req.body se usaria aquí para guardar en bbdd
    res.status(201).json(req.body)
})

// entra a la última si falla
app.use((req, res) => {
    res.send('<h1>404</h1>')
})

app.listen(PORT, () => { console.log(`Server listen on port http://localhost:${PORT}`) })
