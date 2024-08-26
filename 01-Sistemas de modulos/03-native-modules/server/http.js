const { findAvalaiblePort } = require('./free-avalaible-port.js')
const http = require('node:http')

const server =
  http.createServer((req, res) => {
    console.log('Request recieved')
    res.end('hola mundo')
  })
findAvalaiblePort(3306).then(port => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
  })
})
