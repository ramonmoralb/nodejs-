const net = require('node:net')

function findAvalaiblePort (desiredPort) { // el método devuelve una promesa
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen((desiredPort), () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvalaiblePort(0) // el puerto 0 busca un puerto disponible
          .then((port) => resolve(port))
      } else { reject(err) }
    })
  })
}

module.exports = { findAvalaiblePort }
