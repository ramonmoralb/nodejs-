// módulos que no devuelvan promesas se pueden transformar con //node:util promisify//

const fs = require('node:fs');

const { promisify } = require('node:util');

//transforma el módulo para que devuelva una promesa en lugar de un callback
const readFilePromise = promisify(fs.readFile);

readFilePromise('./archivos/archivo.txt', 'utf-8')
  .then((text) => {
    console.log('Primer archivo: usando promisify', text);
  })
  .catch((err) => {
    console.error('Algo ha fallado al leer el primer archivo: ', err.message);
  });
