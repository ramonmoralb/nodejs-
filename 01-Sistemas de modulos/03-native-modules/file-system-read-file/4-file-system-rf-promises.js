const fs = require('node:fs/promises');

console.log('Leyendo el primer archivo.....');
fs.readFile('./archivos/archivo.txt', 'utf-8')
  .then((text) => {
    console.log('Primer archivo: ', text);
  })
  .catch((err) => {
    console.error('Algo ha fallado al leer el primer archivo: ', err.message);
  });

console.log('Haciendo cosas aquí....\n.................\n');

console.log('Leyendo el segundo archivo.....');
fs.readFile('./archivos/archivo2.txt', 'utf-8')
  .then((text) => {
    console.log('Segundo archivo: ', text);
  })
  .catch((error) => {
    console.error(
      'Algo ha fallado al leer el segundo archivo: ',
      error.message
    );
  });
