//async

const fs = require('node:fs');

console.log('Leyendo el primer archivo...', '\n');
fs.readFile('./archivos/archivo.txt', 'utf-8', (err, text) => {
  //tercer parametro callBack
  if (err) {
    console.log('Algo a fallado');
  } else {
    console.log('Primer texto: ', text, '\n');
  }
});

console.log('hacer cosas aqui...', '\n.................\n');

console.log('Leyendo el segundo archivo...', '\n');
fs.readFile('./archivos/archivo2.txt', 'utf-8', (err, text) => {
  //tercer parametro callBack
  if (err) {
    console.log('Algo a fallado', err.message);
  } else {
    console.log('Segundo texto: ', text, '\n');
  }
});
