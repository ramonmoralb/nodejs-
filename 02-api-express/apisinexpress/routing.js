// api
const http = require('node:http')
const ditto = require('./pokemon/ditto.js')

const processRequest = (req, res) => {
  const { method, url } = req // destructuracion

  switch (method) {
    case 'GET': {
      switch (url) {
        case '/': {
          res.statusCode = 200
          res.setHeader('Content-Type', 'Text/html; charset=utf-8')
          return res.end('<h1>Página inicio</h1>')
        }
        case '/pokemon': {
          res.statusCode = 200
          res.setHeader('Content-Type', 'Application/json')
          return res.end(JSON.stringify(ditto))
        }
        default: {
          res.statusCode = 404
          res.setHeader('Content-Type', 'Text/html; charset=utf-8')
          return res.end('<h1>404</h1>')
        }
      }
    }
    case 'POST': {
      switch (url) {
        case '/createpoke': {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            data.timeStamp = Date.now().toString()
            res.statusCode = 201
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
          })
        }
          break

        default: {
          res.statusCode = 404
          res.setHeader('Content-Type', 'Text/html; charset=utf-8')
          return res.end('<h1>404</h1>')
        }
      }
    }
  }
}

/*  if (req.url === '/') {
          res.statusCode = 200
          res.setHeader('Content-Type', 'Application/json')
          res.end(JSON.stringify(ditto))
        }
          */

const server = http.createServer(processRequest)

server.listen(1234, () => {
  console.log('server listen on port http://localhost:1234')
})
