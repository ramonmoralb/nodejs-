const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234
/** const processRequest = (req, res) => {
  if (req.url === '/') {
    console.log('recibido')
    res.statusCode = 200
    res.end('Welcome')
  }
} */
/** status-code
 * 100-199: respuestas informativas
 * 200-299: respuetas satisfactorias
 * 300-399: Errores del cliente
 * 400-499: Errores del servidor
 */
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    console.log('recibido')
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=utf-8 ')
    res.end('<h1>Página de inicio</h1>')
  } else if (req.url === '/contact') {
    console.log('recibido')
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>Contacto</h1>')
  } else if (req.url === '/imagen') {
    fs.readFile('./nodejs.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>error 500</h1>')
      } else {
        res.setHeader('Content-Type', 'Image/jpg')
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html; charset=utf-8 ')
    res.end('<h1>404 Not found</h1>')
  }
})

server.listen(desiredPort, () => {
  console.log(`Server listen on port http://localhost:${desiredPort}`)
})
