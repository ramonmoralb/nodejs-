// trabajando con mjs ecmascript no es necesario envolver el codigo
// si que tiene asyncronia y es la forma recomendada
import { readFile } from 'node:fs/promises';

console.log('leyendo archivo 1........');
const firstText = await readFile('./archivos/archivo.txt', 'utf-8'); // await pausa la ejecución mientras resuelve la promesa
console.log(firstText);

console.log('Hacer cosas aquí...');

console.log('leyendo archivo 2........');
const secondText = await readFile('./archivos/archivo2.txt', 'utf-8'); // await pausa la ejecución mientras resuelve la promesa
console.log(secondText);
