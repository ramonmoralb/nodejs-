const fs = require('node:fs');

//de esta manera ejecuta secuncialmente de manera sincrona.
console.log('Sincrono: ');
console.log('Leyendo el primer archivo.....');
const text = fs.readFileSync('./archivos/archivo.txt', 'utf-8'); // codificación

console.log(text, '\n');

console.log('Hacer cosas mientras lee el archivo \n');

console.log('Leyendo el segundo archivo.....');
const text2 = fs.readFileSync('./archivos/archivo2.txt', 'utf-8'); // codificación
console.log(text2, '\n');
